import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Check } from "lucide-react";
import { recognizeCard } from "./ocrService";

interface CardScannerProps {
  onCardScanned: (cardData: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
  }) => void;
}

export default function CardScanner({ onCardScanned }: CardScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    if (isScanning) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isScanning]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    return canvas.toDataURL("image/jpeg");
  };

  const processCardImage = async () => {
    setIsScanning(true);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    // Capture multiple frames for better OCR results
    setTimeout(async () => {
      const imageData = captureFrame();

      if (imageData) {
        try {
          // Process the image with OCR
          const cardData = await recognizeCard(imageData);

          setScanProgress(100);
          setScanComplete(true);

          // Wait a moment to show completion before closing
          setTimeout(() => {
            onCardScanned(cardData);
          }, 1000);
        } catch (error) {
          console.error("OCR processing error:", error);
          setScanProgress(0);
          setIsScanning(false);
        }
      }

      clearInterval(progressInterval);
    }, 3000);
  };

  if (hasPermission === false) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">
          Camera access denied. Please enable camera permissions and try again.
        </p>
        <Button onClick={() => setHasPermission(null)}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg border-2 border-dashed border-primary mb-4">
        {!isScanning ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Camera className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="mb-2 text-sm text-muted-foreground">
              Position your card within the frame
            </p>
            <Button onClick={processCardImage}>Start Scanning</Button>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
            <canvas ref={canvasRef} className="hidden" />

            {/* Card outline guide */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`
                border-2 rounded-xl w-[85%] h-[60%] 
                ${scanComplete ? "border-green-500" : "border-primary"} 
                transition-colors duration-300
              `}
              >
                {scanComplete && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-green-500 rounded-full p-2">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {isScanning && !scanComplete && (
        <div className="w-full max-w-sm mb-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-sm text-center mt-2">
            {scanProgress < 100 ? "Scanning card..." : "Processing..."}
          </p>
        </div>
      )}
    </div>
  );
}
