from googletrans import Translator

translator = Translator()

def detect_language(text):
    try:
        detection = translator.detect(text)
        return detection.lang
    except Exception as e:
        print(f"Error detecting language: {e}")
        return "unknown"

def translate_text(text, target_language):
    try:
        translated = translator.translate(text, dest=target_language)
        return translated.text
    except Exception as e:
        print(f"Error translating text: {e}")
        return None


