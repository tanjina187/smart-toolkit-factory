
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, QrCode, RefreshCw } from "lucide-react";

const QRCodeGenerator = () => {
  const { toast } = useToast();
  const qrImageRef = useRef<HTMLImageElement>(null);
  
  const [qrContent, setQrContent] = useState<string>("");
  const [qrType, setQrType] = useState<string>("text");
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrColor, setQrColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Fix: Use a more reliable QR code generation service
  const generateQRCode = () => {
    if (!qrContent) {
      toast({
        title: "Input Error",
        description: "Please enter content for the QR code",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setImageLoaded(false);
    
    // Prepare content based on type
    let finalContent = qrContent;
    
    if (qrType === "url" && !qrContent.startsWith("http")) {
      finalContent = "https://" + qrContent;
    } else if (qrType === "email") {
      finalContent = "mailto:" + qrContent;
    } else if (qrType === "phone") {
      finalContent = "tel:" + qrContent;
    }
    
    // Encode content for URL
    const encodedContent = encodeURIComponent(finalContent);
    
    // Use QR Server API for more reliable QR code generation
    const cleanQrColor = qrColor.replace('#', '');
    const cleanBgColor = bgColor.replace('#', '');
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedContent}&color=${cleanQrColor}&bgcolor=${cleanBgColor}&margin=10`;
    
    setQrCodeUrl(apiUrl);
    setIsGenerating(false);
  };

  // Handle image loading error
  const handleImageError = () => {
    toast({
      title: "Error",
      description: "Failed to generate QR code. Please try again.",
      variant: "destructive",
    });
    setIsGenerating(false);
  };

  // Handle image loaded successfully
  const handleImageLoaded = () => {
    setImageLoaded(true);
    setIsGenerating(false);
  };

  // Generate QR code when parameters change
  useEffect(() => {
    if (qrContent) {
      generateQRCode();
    }
  }, [qrSize, qrColor, bgColor]);

  // Handle content input change based on type
  const handleContentChange = (value: string) => {
    setQrContent(value);
  };

  // Handle QR code download - Fix for download functionality
  const downloadQRCode = () => {
    if (!qrCodeUrl || !imageLoaded || !qrImageRef.current) {
      toast({
        title: "Error",
        description: "QR code is not ready yet. Please wait or regenerate.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a canvas element to draw the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size to match the QR code
    canvas.width = qrImageRef.current.naturalWidth;
    canvas.height = qrImageRef.current.naturalHeight;
    
    // Draw the image on the canvas
    ctx.drawImage(qrImageRef.current, 0, 0);
    
    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL("image/png");
    
    // Create a link element and trigger download
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Downloaded!",
      description: "QR code has been downloaded successfully",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs value={qrType} onValueChange={setQrType} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4 pt-4">
              <Textarea
                placeholder="Enter text for QR code"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[100px]"
              />
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 pt-4">
              <Input
                type="text"
                placeholder="Enter URL (e.g., example.com)"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 pt-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 pt-4">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={qrContent}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">QR Size (px)</label>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100px</span>
                <span>{qrSize}px</span>
                <span>500px</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">QR Color</label>
                <div className="flex">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 rounded-l-md border border-border"
                  />
                  <Input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Background Color</label>
                <div className="flex">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-l-md border border-border"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={generateQRCode} 
            className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 gap-2"
            disabled={!qrContent || isGenerating}
          >
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {qrCodeUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center"
            >
              <div className="p-4 bg-white rounded-md inline-block shadow-md border border-fuchsia-100/20">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-[200px] w-[200px]">
                    <RefreshCw className="w-8 h-8 text-fuchsia-400 animate-spin" />
                  </div>
                ) : (
                  <img
                    ref={qrImageRef}
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                  />
                )}
                {!imageLoaded && !isGenerating && (
                  <div className="flex items-center justify-center h-[200px] w-[200px]">
                    <RefreshCw className="w-8 h-8 text-fuchsia-400 animate-spin" />
                  </div>
                )}
              </div>
              
              <Button 
                onClick={downloadQRCode}
                className="gap-2 bg-fuchsia-500 hover:bg-fuchsia-600"
                disabled={!imageLoaded || isGenerating}
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code</span>
              </Button>

              <div className="text-xs text-muted-foreground mt-2">
                {qrType === 'text' ? 'Text' : qrType === 'url' ? 'URL' : qrType === 'email' ? 'Email' : 'Phone'}: 
                <span className="font-mono ml-1">{qrContent}</span>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-muted-foreground p-8 border border-dashed border-border rounded-md">
              QR code will appear here after generation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
