
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const EcommerceProfitCalculator = () => {
  const { toast } = useToast();
  
  const [productCost, setProductCost] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [marketplaceFee, setMarketplaceFee] = useState<string>("0");
  const [taxRate, setTaxRate] = useState<string>("0");
  
  const [result, setResult] = useState<{
    revenue: number;
    totalCost: number;
    profit: number;
    profitMargin: number;
    roi: number;
  } | null>(null);

  const calculateProfit = () => {
    if (!productCost || !sellingPrice) {
      toast({
        title: "Input Error",
        description: "Please enter product cost and selling price",
        variant: "destructive",
      });
      return;
    }
    
    const cost = parseFloat(productCost);
    const price = parseFloat(sellingPrice);
    const shipping = parseFloat(shippingCost || "0");
    const fee = parseFloat(marketplaceFee || "0");
    const tax = parseFloat(taxRate || "0");
    
    if (isNaN(cost) || isNaN(price) || isNaN(shipping) || isNaN(fee) || isNaN(tax)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (cost < 0 || price < 0 || shipping < 0 || fee < 0 || tax < 0) {
      toast({
        title: "Input Error",
        description: "Values cannot be negative",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate revenue
    const revenue = price;
    
    // Calculate fees
    const marketplaceFeeAmount = (revenue * fee) / 100;
    
    // Calculate tax
    const taxAmount = (revenue * tax) / 100;
    
    // Calculate total cost
    const totalCost = cost + shipping + marketplaceFeeAmount + taxAmount;
    
    // Calculate profit
    const profit = revenue - totalCost;
    
    // Calculate profit margin (profit / revenue)
    const profitMargin = (profit / revenue) * 100;
    
    // Calculate ROI (profit / cost)
    const roi = (profit / cost) * 100;
    
    setResult({
      revenue,
      totalCost,
      profit,
      profitMargin,
      roi
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Product Cost (₹)</label>
              <Input
                type="number"
                placeholder="Enter product cost"
                value={productCost}
                onChange={(e) => setProductCost(e.target.value)}
                min={0}
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
            
            <div>
              <label className="text-sm font-medium mb-2 block">Shipping Cost (₹)</label>
              <Input
                type="number"
                placeholder="Enter shipping cost"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                min={0}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Marketplace Fee (%)</label>
              <Input
                type="number"
                placeholder="Enter marketplace fee percentage"
                value={marketplaceFee}
                onChange={(e) => setMarketplaceFee(e.target.value)}
                min={0}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Tax Rate (%)</label>
              <Input
                type="number"
                placeholder="Enter tax rate"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                min={0}
              />
            </div>
          </div>
          
          <Button onClick={calculateProfit} className="w-full">Calculate Profit</Button>
        </div>
        
        {result && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div
              className={`p-6 rounded-md text-center ${
                result.profit >= 0 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              <h3 className="text-lg font-medium mb-1">
                {result.profit >= 0 ? "Profit" : "Loss"}
              </h3>
              <div className="text-3xl font-bold mb-2">
                ₹{Math.abs(result.profit).toFixed(2)}
              </div>
              <p className="text-sm">
                {result.profitMargin.toFixed(2)}% Profit Margin
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-semibold">₹{result.revenue.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Cost</span>
                  <span className="font-semibold">₹{result.totalCost.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-semibold">{result.roi.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            {result.profit > 0 ? (
              <div className="p-4 rounded-md bg-green-500/5 text-sm">
                <p className="font-medium text-green-600 mb-1">Profit Analysis</p>
                <p className="text-muted-foreground">
                  {result.profitMargin > 20 
                    ? "Your profit margin is excellent! Consider scaling this product."
                    : result.profitMargin > 10 
                    ? "Good profit margin. Consider ways to reduce costs to improve further."
                    : "Slim profit margin. Look for ways to reduce costs or increase price."}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-md bg-red-500/5 text-sm">
                <p className="font-medium text-red-600 mb-1">Loss Analysis</p>
                <p className="text-muted-foreground">
                  You're losing money on this product. Consider increasing your selling price,
                  finding a cheaper supplier, or reducing shipping costs.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcommerceProfitCalculator;
