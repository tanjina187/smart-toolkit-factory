
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ProfitLossCalculator = () => {
  const { toast } = useToast();
  
  const [costPrice, setCostPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [result, setResult] = useState<{
    isProfitable: boolean;
    amount: number;
    percentage: number;
  } | null>(null);

  const calculateProfitLoss = () => {
    if (!costPrice || !sellingPrice) {
      toast({
        title: "Input Error",
        description: "Please enter both cost price and selling price",
        variant: "destructive",
      });
      return;
    }
    
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    
    if (isNaN(cp) || isNaN(sp)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (cp <= 0) {
      toast({
        title: "Input Error",
        description: "Cost price must be greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    const isProfitable = sp > cp;
    const amount = Math.abs(sp - cp);
    const percentage = (amount / cp) * 100;
    
    setResult({
      isProfitable,
      amount,
      percentage
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Cost Price (₹)</label>
              <Input
                type="number"
                placeholder="Enter cost price"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                min={1}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Selling Price (₹)</label>
              <Input
                type="number"
                placeholder="Enter selling price"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                min={0}
              />
            </div>
          </div>
          
          <Button onClick={calculateProfitLoss} className="w-full">Calculate</Button>
        </div>
        
        {result && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div
              className={`p-6 rounded-md text-center ${
                result.isProfitable 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              <h3 className="text-lg font-medium mb-1">
                {result.isProfitable ? "Profit" : "Loss"}
              </h3>
              <div className="text-3xl font-bold mb-2">
                ₹{result.amount.toFixed(2)}
              </div>
              <p className="text-sm">
                {result.percentage.toFixed(2)}%
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cost Price</span>
                  <span className="font-semibold">₹{parseFloat(costPrice).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Selling Price</span>
                  <span className="font-semibold">₹{parseFloat(sellingPrice).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {result.isProfitable ? "Profit" : "Loss"} Amount
                  </span>
                  <span className="font-semibold">₹{result.amount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {result.isProfitable ? "Profit" : "Loss"} Percentage
                  </span>
                  <span className="font-semibold">{result.percentage.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            {result.isProfitable ? (
              <div className="p-4 rounded-md bg-green-500/5 text-sm">
                <p className="font-medium text-green-600 mb-1">Profit Insights</p>
                <p className="text-muted-foreground">
                  You made a profit of ₹{result.amount.toFixed(2)}, which is {result.percentage.toFixed(2)}% 
                  of your cost price. Good job!
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-md bg-red-500/5 text-sm">
                <p className="font-medium text-red-600 mb-1">Loss Insights</p>
                <p className="text-muted-foreground">
                  You incurred a loss of ₹{result.amount.toFixed(2)}, which is {result.percentage.toFixed(2)}% 
                  of your cost price. Consider adjusting your pricing strategy.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfitLossCalculator;
