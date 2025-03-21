
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GSTCalculator = () => {
  const { toast } = useToast();
  
  // Add GST to amount
  const [amount, setAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<string>("18");
  const [addResult, setAddResult] = useState<{ gstAmount: number; totalAmount: number } | null>(null);
  
  // Remove GST from amount
  const [inclusiveAmount, setInclusiveAmount] = useState<string>("");
  const [inclusiveGstRate, setInclusiveGstRate] = useState<string>("18");
  const [removeResult, setRemoveResult] = useState<{ gstAmount: number; netAmount: number } | null>(null);

  // Calculate by adding GST
  const handleAddGST = () => {
    if (!amount) {
      toast({
        title: "Input Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    const numAmount = parseFloat(amount);
    const numGstRate = parseFloat(gstRate);
    
    if (isNaN(numAmount) || isNaN(numGstRate)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    const gstAmount = (numAmount * numGstRate) / 100;
    const totalAmount = numAmount + gstAmount;
    
    setAddResult({
      gstAmount,
      totalAmount
    });
  };

  // Calculate by removing GST
  const handleRemoveGST = () => {
    if (!inclusiveAmount) {
      toast({
        title: "Input Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    const numAmount = parseFloat(inclusiveAmount);
    const numGstRate = parseFloat(inclusiveGstRate);
    
    if (isNaN(numAmount) || isNaN(numGstRate)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    const netAmount = numAmount / (1 + numGstRate / 100);
    const gstAmount = numAmount - netAmount;
    
    setRemoveResult({
      gstAmount,
      netAmount
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="add">Add GST</TabsTrigger>
          <TabsTrigger value="remove">Remove GST</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Amount (Without GST)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">GST Rate (%)</label>
                <Select value={gstRate} onValueChange={setGstRate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleAddGST} className="w-full">Calculate</Button>
            
            {addResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-primary/10">
                    <div className="text-sm text-muted-foreground">Net Amount</div>
                    <div className="text-xl font-bold">₹{parseFloat(amount).toFixed(2)}</div>
                  </div>
                  <div className="p-4 rounded-md bg-primary/10">
                    <div className="text-sm text-muted-foreground">GST Amount</div>
                    <div className="text-xl font-bold">₹{addResult.gstAmount.toFixed(2)}</div>
                  </div>
                </div>
                <div className="p-4 rounded-md bg-primary/10">
                  <div className="text-sm text-muted-foreground">Total Amount (with GST)</div>
                  <div className="text-xl font-bold">₹{addResult.totalAmount.toFixed(2)}</div>
                </div>
              </motion.div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="remove" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Amount (Including GST)</label>
                <Input
                  type="number"
                  placeholder="Enter amount with GST"
                  value={inclusiveAmount}
                  onChange={(e) => setInclusiveAmount(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">GST Rate (%)</label>
                <Select value={inclusiveGstRate} onValueChange={setInclusiveGstRate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleRemoveGST} className="w-full">Calculate</Button>
            
            {removeResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-md bg-primary/10">
                    <div className="text-sm text-muted-foreground">Net Amount</div>
                    <div className="text-xl font-bold">₹{removeResult.netAmount.toFixed(2)}</div>
                  </div>
                  <div className="p-4 rounded-md bg-primary/10">
                    <div className="text-sm text-muted-foreground">GST Amount</div>
                    <div className="text-xl font-bold">₹{removeResult.gstAmount.toFixed(2)}</div>
                  </div>
                </div>
                <div className="p-4 rounded-md bg-primary/10">
                  <div className="text-sm text-muted-foreground">Total Amount (with GST)</div>
                  <div className="text-xl font-bold">₹{parseFloat(inclusiveAmount).toFixed(2)}</div>
                </div>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GSTCalculator;
