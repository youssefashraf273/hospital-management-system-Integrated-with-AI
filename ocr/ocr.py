from paddleocr import PaddleOCR
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import uvicorn
import nest_asyncio
import io
from PIL import Image
import numpy as np
import re

nest_asyncio.apply()
ocr = PaddleOCR(use_angle_cls=True, lang='en|ar')

def perform_ocr(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_np = np.array(image)
    result = ocr.ocr(image_np)

    extracted_data = []

    if result and isinstance(result, list) and len(result) > 0:
        if 'rec_texts' in result[0]:
            texts = result[0]['rec_texts']
            scores = result[0]['rec_scores']
            for text, score in zip(texts, scores):
                extracted_data.append({
                    'text': text,
                    'confidence': float(score)
                })
        else:
            for line in result[0]:
                if len(line) >= 2:
                    text_info = line[1]
                    if isinstance(text_info, tuple) and len(text_info) == 2:
                        text, confidence = text_info
                    else:
                        text = text_info
                        confidence = None
                    extracted_data.append({
                        'text': text,
                        'confidence': confidence
                    })

    return extracted_data

app = FastAPI()

@app.post("/ocr")
async def ocr_endpoint(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        ocr_results = perform_ocr(contents)

        if not ocr_results:
            return JSONResponse(content={
                "status": "error",
                "message": "No text detected"
            })

        card_info = {
            "card_type": None,
            "card_number": None,
            "card_expire_date": None,
        }

        all_text = " ".join([item['text'].strip() for item in ocr_results])

        # 1. Card type (from text)
        for item in ocr_results:
            text = item['text'].strip().upper()
            if "VISA" in text:
                card_info["card_type"] = "VISA"
                break
            elif "MASTERCARD" in text or "MASTER CARD" in text:
                card_info["card_type"] = "MASTERCARD"
                break
            elif "AMERICAN EXPRESS" in text or "AMEX" in text:
                card_info["card_type"] = "AMEX"
                break
            elif "DISCOVER" in text:
                card_info["card_type"] = "DISCOVER"
                break

        # 2. Card number
        card_numbers = []
        for item in ocr_results:
            text = item['text'].strip()
            numbers = re.findall(r'\b\d{3,4}\b', text)
            if numbers:
                card_numbers.extend(numbers)
        if len(card_numbers) >= 4:
            last_four_groups = card_numbers[-4:]
            card_info["card_number"] = ' '.join(last_four_groups)

        # 3. Expiry date
        card_expire_date = None
        for i, item in enumerate(ocr_results):
            text = item['text'].strip().upper()
            if "VALID" in text or "THRU" in text or "EXPIRY" in text or "EXP" in text:
                for j in range(i + 1, min(i + 3, len(ocr_results))):
                    next_text = ocr_results[j]['text'].strip()
                    date_match = re.search(r'\b\d{2}[/\-\.]\d{2}\b', next_text)
                    if date_match:
                        card_expire_date = date_match.group(0)
                        break
                if card_expire_date:
                    break
        if not card_expire_date:
            date_match = re.search(r'\b\d{2}[/\-\.]\d{2}\b', all_text)
            if date_match:
                card_expire_date = date_match.group(0)
        card_info["card_expire_date"] = card_expire_date


    
        if card_info["card_number"] and not card_info["card_type"]:
            digits_only = card_info["card_number"].replace(" ", "")
            if re.match(r'^4\d{12}(\d{3})?$', digits_only):
                card_info["card_type"] = "VISA"
            elif re.match(r'^(5[1-5]|2[2-7]\d)\d{14}$', digits_only):
                card_info["card_type"] = "MASTERCARD"
            elif re.match(r'^3[47]\d{13}$', digits_only):
                card_info["card_type"] = "AMEX"
            elif re.match(r'^(6011|65|64[4-9])\d{12}$', digits_only):
                card_info["card_type"] = "DISCOVER"
            elif re.match(r'^5078(?:03|09|10)', digits_only):
                card_info["card_type"] = "MEZA"

        return JSONResponse(content={
            "status": "success",
            "card_info": card_info,
            "raw_results": ocr_results
        })

    except Exception as e:
        return JSONResponse(content={
            "status": "error",
            "message": str(e)
        }, status_code=500)
