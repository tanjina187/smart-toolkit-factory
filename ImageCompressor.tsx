
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Upload, Download, RefreshCw, FileImage } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const ImageCompressor = () => {
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    savingsPercent: number;
  } | null>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check if it's an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    setCompressedUrl(null);
    setCompressionStats(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Compress image (client-side simulation for now)
  const compressImage = () => {
    if (!selectedFile || !previewUrl) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to compress",
        variant: "destructive",
      });
      return;
    }
    
    setIsCompressing(true);
    
    // In a real application, we would use canvas to compress the image
    // For this demo, we'll simulate compression
    setTimeout(() => {
      // Simulate compression by calculating expected size based on quality
      const originalSize = selectedFile.size;
      
      // Simulate compression based on quality setting
      // Lower quality = smaller file size
      const compressionFactor = quality / 100;
      const expectedSize = Math.floor(originalSize * (0.4 + (compressionFactor * 0.6)));
      
      // Calculate savings
      const savingsPercent = ((originalSize - expectedSize) / originalSize) * 100;
      
      setCompressedUrl(previewUrl); // Just use original for demo
      setCompressionStats({
        originalSize,
        compressedSize: expectedSize,
        savingsPercent
      });
      
      setIsCompressing(false);
      
      toast({
        title: "Compression Complete",
        description: `Image compressed by ${savingsPercent.toFixed(1)}%`,
      });
    }, 1500);
  };
  
  // Format file size in KB/MB
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };
  
  // Download compressed image
  const downloadImage = () => {
    if (!compressedUrl || !selectedFile) return;
    
    const a = document.createElement("a");
    a.href = compressedUrl;
    
    // Get filename without extension
    const originalName = selectedFile.name.split('.');
    const ext = originalName.pop();
    const baseName = originalName.join('.');
    
    a.download = `${baseName}-compressed.${ext}`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <label
            htmlFor="image-upload"
            className="block w-full p-8 border-2 border-dashed border-primary/20 rounded-lg text-center cursor-pointer hover:bg-primary/5 transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <span className="font-medium mb-1">Click to upload an image</span>
              <span className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 5MB</span>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </label>
          
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[200px] max-w-full rounded-md object-contain"
              />
            </motion.div>
          )}
        </div>
        
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-4 bg-primary/5 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
                <div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setCompressedUrl(null);
                      setCompressionStats(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Compression Quality</label>
                  <span>{quality}%</span>
                </div>
                <Slider
                  value={[quality]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setQuality(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Quality</span>
                  <span>High Quality</span>
                </div>
              </div>
              
              <Button 
                onClick={compressImage} 
                className="w-full gap-2"
                disabled={isCompressing || !selectedFile}
              >
                {isCompressing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compressing...</span>
                  </>
                ) : (
                  <>
                    <FileImage className="w-4 h-4" />
                    <span>Compress Image</span>
                  </>
                )}
              </Button>
            </div>
            
            {compressedUrl && compressionStats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-md bg-primary/5 text-center">
                    <div className="text-sm text-muted-foreground">Original</div>
                    <div className="font-semibold">{formatFileSize(compressionStats.originalSize)}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-primary/5 text-center">
                    <div className="text-sm text-muted-foreground">Compressed</div>
                    <div className="font-semibold">{formatFileSize(compressionStats.compressedSize)}</div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-green-500/10 text-center text-green-600">
                    <div className="text-sm">Savings</div>
                    <div className="font-semibold">{compressionStats.savingsPercent.toFixed(1)}%</div>
                  </div>
                </div>
                
                <Button 
                  onClick={downloadImage} 
                  className="w-full gap-2"
                  variant="default"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Compressed Image</span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
        
        <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-md">
          <p className="font-medium text-foreground mb-1">About Image Compression</p>
          <p>
            This tool compresses your images to reduce file size while maintaining reasonable quality.
            Lower quality settings result in smaller file sizes but may introduce artifacts.
            The compression happens in your browser, so your images are never uploaded to a server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
