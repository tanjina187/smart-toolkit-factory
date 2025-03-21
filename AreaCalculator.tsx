
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const AreaCalculator = () => {
  const { toast } = useToast();
  const [selectedShape, setSelectedShape] = useState<string>("rectangle");
  
  // Rectangle state
  const [rectangleWidth, setRectangleWidth] = useState<string>("");
  const [rectangleLength, setRectangleLength] = useState<string>("");
  const [rectangleArea, setRectangleArea] = useState<number | null>(null);
  
  // Circle state
  const [circleRadius, setCircleRadius] = useState<string>("");
  const [circleArea, setCircleArea] = useState<number | null>(null);
  
  // Triangle state
  const [triangleBase, setTriangleBase] = useState<string>("");
  const [triangleHeight, setTriangleHeight] = useState<string>("");
  const [triangleArea, setTriangleArea] = useState<number | null>(null);
  
  // Calculate rectangle area
  const calculateRectangleArea = () => {
    if (!rectangleWidth || !rectangleLength) {
      toast({
        title: "Input Error",
        description: "Please enter both width and length",
        variant: "destructive",
      });
      return;
    }
    
    const width = parseFloat(rectangleWidth);
    const length = parseFloat(rectangleLength);
    
    if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
      toast({
        title: "Input Error",
        description: "Please enter valid positive numbers",
        variant: "destructive",
      });
      return;
    }
    
    const area = width * length;
    setRectangleArea(area);
  };
  
  // Calculate circle area
  const calculateCircleArea = () => {
    if (!circleRadius) {
      toast({
        title: "Input Error",
        description: "Please enter the radius",
        variant: "destructive",
      });
      return;
    }
    
    const radius = parseFloat(circleRadius);
    
    if (isNaN(radius) || radius <= 0) {
      toast({
        title: "Input Error",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    
    const area = Math.PI * radius * radius;
    setCircleArea(area);
  };
  
  // Calculate triangle area
  const calculateTriangleArea = () => {
    if (!triangleBase || !triangleHeight) {
      toast({
        title: "Input Error",
        description: "Please enter both base and height",
        variant: "destructive",
      });
      return;
    }
    
    const base = parseFloat(triangleBase);
    const height = parseFloat(triangleHeight);
    
    if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
      toast({
        title: "Input Error",
        description: "Please enter valid positive numbers",
        variant: "destructive",
      });
      return;
    }
    
    const area = 0.5 * base * height;
    setTriangleArea(area);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs 
        value={selectedShape} 
        onValueChange={setSelectedShape}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
          <TabsTrigger value="circle">Circle</TabsTrigger>
          <TabsTrigger value="triangle">Triangle</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rectangle" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Width</label>
                <Input
                  type="number"
                  placeholder="Enter width"
                  value={rectangleWidth}
                  onChange={(e) => setRectangleWidth(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Length</label>
                <Input
                  type="number"
                  placeholder="Enter length"
                  value={rectangleLength}
                  onChange={(e) => setRectangleLength(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={calculateRectangleArea} className="w-full">Calculate Area</Button>
            
            {rectangleArea !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Area</span>
                <span className="text-xl font-bold">{rectangleArea.toFixed(2)} square units</span>
                <span className="block text-sm mt-1">
                  Width × Length = {rectangleWidth} × {rectangleLength} = {rectangleArea.toFixed(2)}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="circle" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Radius</label>
              <Input
                type="number"
                placeholder="Enter radius"
                value={circleRadius}
                onChange={(e) => setCircleRadius(e.target.value)}
              />
            </div>
            
            <Button onClick={calculateCircleArea} className="w-full">Calculate Area</Button>
            
            {circleArea !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Area</span>
                <span className="text-xl font-bold">{circleArea.toFixed(2)} square units</span>
                <span className="block text-sm mt-1">
                  π × r² = π × {circleRadius}² = {circleArea.toFixed(2)}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="triangle" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Base</label>
                <Input
                  type="number"
                  placeholder="Enter base"
                  value={triangleBase}
                  onChange={(e) => setTriangleBase(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Height</label>
                <Input
                  type="number"
                  placeholder="Enter height"
                  value={triangleHeight}
                  onChange={(e) => setTriangleHeight(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={calculateTriangleArea} className="w-full">Calculate Area</Button>
            
            {triangleArea !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Area</span>
                <span className="text-xl font-bold">{triangleArea.toFixed(2)} square units</span>
                <span className="block text-sm mt-1">
                  ½ × Base × Height = ½ × {triangleBase} × {triangleHeight} = {triangleArea.toFixed(2)}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AreaCalculator;
