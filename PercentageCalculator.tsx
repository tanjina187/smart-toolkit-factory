
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const PercentageCalculator = () => {
  const { toast } = useToast();
  
  // Find percentage (X% of Y)
  const [value, setValue] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const [percentResult, setPercentResult] = useState<string | null>(null);
  
  // Calculate percentage (X is what % of Y)
  const [partValue, setPartValue] = useState<string>("");
  const [totalValue, setTotalValue] = useState<string>("");
  const [calculateResult, setCalculateResult] = useState<string | null>(null);
  
  // Calculate value from percentage (X is Y% of what?)
  const [knownValue, setKnownValue] = useState<string>("");
  const [knownPercent, setKnownPercent] = useState<string>("");
  const [valueResult, setValueResult] = useState<string | null>(null);

  // Calculate percentage of a value
  const handleFindPercentage = () => {
    if (!value || !percent) {
      toast({
        title: "Input Error",
        description: "Please enter both values",
        variant: "destructive",
      });
      return;
    }
    
    const numValue = parseFloat(value);
    const numPercent = parseFloat(percent);
    
    if (isNaN(numValue) || isNaN(numPercent)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    const result = (numValue * numPercent) / 100;
    setPercentResult(result.toFixed(2));
  };

  // Calculate what percentage X is of Y
  const handleCalculatePercentage = () => {
    if (!partValue || !totalValue) {
      toast({
        title: "Input Error",
        description: "Please enter both values",
        variant: "destructive",
      });
      return;
    }
    
    const numPart = parseFloat(partValue);
    const numTotal = parseFloat(totalValue);
    
    if (isNaN(numPart) || isNaN(numTotal)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (numTotal === 0) {
      toast({
        title: "Input Error",
        description: "Total value cannot be zero",
        variant: "destructive",
      });
      return;
    }
    
    const result = (numPart / numTotal) * 100;
    setCalculateResult(result.toFixed(2));
  };

  // Calculate the value when percentage is known
  const handleCalculateValue = () => {
    if (!knownValue || !knownPercent) {
      toast({
        title: "Input Error",
        description: "Please enter both values",
        variant: "destructive",
      });
      return;
    }
    
    const numValue = parseFloat(knownValue);
    const numPercent = parseFloat(knownPercent);
    
    if (isNaN(numValue) || isNaN(numPercent)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (numPercent === 0) {
      toast({
        title: "Input Error",
        description: "Percentage cannot be zero",
        variant: "destructive",
      });
      return;
    }
    
    const result = (numValue * 100) / numPercent;
    setValueResult(result.toFixed(2));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="find" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="find">Find Percentage</TabsTrigger>
          <TabsTrigger value="calculate">Calculate Percentage</TabsTrigger>
          <TabsTrigger value="value">Find Value</TabsTrigger>
        </TabsList>
        
        <TabsContent value="find" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Value</label>
                <Input
                  type="number"
                  placeholder="Enter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Percentage (%)</label>
                <Input
                  type="number"
                  placeholder="Enter percentage"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={handleFindPercentage} className="w-full">Calculate</Button>
            
            {percentResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Result</span>
                <span className="text-xl font-bold">{percentResult}</span>
                <span className="block text-sm mt-1">
                  {percent}% of {value} is {percentResult}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="calculate" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Part Value</label>
                <Input
                  type="number"
                  placeholder="Enter part value"
                  value={partValue}
                  onChange={(e) => setPartValue(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Total Value</label>
                <Input
                  type="number"
                  placeholder="Enter total value"
                  value={totalValue}
                  onChange={(e) => setTotalValue(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={handleCalculatePercentage} className="w-full">Calculate</Button>
            
            {calculateResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Result</span>
                <span className="text-xl font-bold">{calculateResult}%</span>
                <span className="block text-sm mt-1">
                  {partValue} is {calculateResult}% of {totalValue}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="value" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Known Value</label>
                <Input
                  type="number"
                  placeholder="Enter known value"
                  value={knownValue}
                  onChange={(e) => setKnownValue(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Percentage (%)</label>
                <Input
                  type="number"
                  placeholder="Enter percentage"
                  value={knownPercent}
                  onChange={(e) => setKnownPercent(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={handleCalculateValue} className="w-full">Calculate</Button>
            
            {valueResult !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-md bg-primary/10 text-center"
              >
                <span className="block text-sm text-muted-foreground">Result</span>
                <span className="text-xl font-bold">{valueResult}</span>
                <span className="block text-sm mt-1">
                  {knownValue} is {knownPercent}% of {valueResult}
                </span>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PercentageCalculator;
