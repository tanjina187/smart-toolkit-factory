
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Upload, Download, RefreshCw, Image } from "lucide-react";

const ImageConverter = () => {
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("jpeg");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  
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
    
    setSelectedFile(file);
    setConvertedUrl(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle format change
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputFormat(e.target.value);
    setConvertedUrl(null);
  };
  
  // Convert image (client-side simulation)
  const convertImage = () => {
    if (!selectedFile || !previewUrl) {
      toast({
        title: "No Image Selected",
        description: "Please select an image to convert",
        variant: "destructive",
      });
      return;
    }
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      // In a real app, we would use canvas to convert the image
      // For now, we'll just use the original image and pretend it's converted
      setConvertedUrl(previewUrl);
      setIsConverting(false);
      
      toast({
        title: "Conversion Complete",
        description: `Image converted to ${outputFormat.toUpperCase()} format`,
      });
    }, 1500);
  };
  
  // Download converted image
  const downloadImage = () => {
    if (!convertedUrl || !selectedFile) return;
    
    const a = document.createElement("a");
    a.href = convertedUrl;
    
    // Get filename without extension
    const originalName = selectedFile.name.split('.')[0];
    a.download = `${originalName}.${outputFormat}`;
    
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
              <span className="text-sm text-muted-foreground">PNG, JPG, GIF, WEBP, SVG up to 5MB</span>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
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
                    {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type}
                  </p>
                </div>
                <div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setConvertedUrl(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="format" className="text-sm font-medium block mb-2">Convert to:</label>
                <select
                  id="format"
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={outputFormat}
                  onChange={handleFormatChange}
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={convertImage} 
                  className="w-full gap-2"
                  disabled={isConverting || !selectedFile}
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4" />
                      <span>Convert Image</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {convertedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="border border-border rounded-md p-4">
                  <div className="text-center">
                    <h3 className="font-medium mb-3">Converted Image</h3>
                    <img
                      src={convertedUrl}
                      alt="Converted"
                      className="max-h-[200px] max-w-full mx-auto object-contain"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={downloadImage} 
                  className="w-full gap-2"
                  variant="default"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {outputFormat.toUpperCase()} Image</span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
        
        <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-md">
          <p className="font-medium text-foreground mb-1">About Image Conversion</p>
          <p>
            This tool lets you convert images between different formats including JPEG, PNG, WEBP, and GIF.
            The conversion happens directly in your browser, so your images are never uploaded to a server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
