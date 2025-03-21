
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";

const EMICalculator = () => {
  const { toast } = useToast();
  
  const [loanAmount, setLoanAmount] = useState<string>("1000000");
  const [interestRate, setInterestRate] = useState<string>("10");
  const [loanTenure, setLoanTenure] = useState<string>("60");
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate EMI
  const calculateEmi = () => {
    if (!loanAmount || !interestRate || !loanTenure) {
      toast({
        title: "Input Error",
        description: "Please enter all values",
        variant: "destructive",
      });
      return;
    }
    
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(loanTenure);
    
    if (isNaN(principal) || isNaN(ratePerMonth) || isNaN(time)) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    if (principal <= 0 || ratePerMonth <= 0 || time <= 0) {
      toast({
        title: "Input Error",
        description: "Values must be greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    // EMI calculation formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emiValue = principal * ratePerMonth * Math.pow(1 + ratePerMonth, time) / (Math.pow(1 + ratePerMonth, time) - 1);
    
    const totalPaymentValue = emiValue * time;
    const totalInterestValue = totalPaymentValue - principal;
    
    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
  };
  
  // Calculate on initial render
  useEffect(() => {
    calculateEmi();
  }, []);
  
  // Chart data
  const chartData = totalInterest !== null ? [
    { name: "Principal", value: parseFloat(loanAmount) },
    { name: "Interest", value: totalInterest }
  ] : [];
  
  const COLORS = ['#3B82F6', '#F97316'];
  
  // Format number input to include commas
  const formatNumberInput = (value: string) => {
    // Remove non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    // Format with commas
    if (numericValue) {
      return parseInt(numericValue).toLocaleString('en-IN');
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium block">Loan Amount (₹)</label>
            <Input
              type="text"
              value={formatNumberInput(loanAmount)}
              onChange={(e) => setLoanAmount(e.target.value.replace(/[^\d]/g, ''))}
              className="text-right"
            />
            <Slider
              value={[parseFloat(loanAmount) || 0]}
              min={10000}
              max={10000000}
              step={10000}
              onValueChange={(value) => setLoanAmount(value[0].toString())}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹10K</span>
              <span>₹1Cr</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium block">Interest Rate (% per annum)</label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min={1}
              max={30}
              step={0.1}
              className="text-right"
            />
            <Slider
              value={[parseFloat(interestRate) || 0]}
              min={1}
              max={30}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0].toString())}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium block">Loan Tenure (months)</label>
            <Input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              min={6}
              max={360}
              className="text-right"
            />
            <Slider
              value={[parseFloat(loanTenure) || 0]}
              min={6}
              max={360}
              step={1}
              onValueChange={(value) => setLoanTenure(value[0].toString())}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>6 months</span>
              <span>30 years</span>
            </div>
          </div>
          
          <Button onClick={calculateEmi} className="w-full">Calculate EMI</Button>
        </div>
        
        {emi !== null && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-md bg-primary/10 text-center">
              <div className="text-sm text-muted-foreground">Monthly EMI</div>
              <div className="text-2xl font-bold">{formatCurrency(emi)}</div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 p-4 rounded-md bg-primary/10">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-lg font-semibold">{formatCurrency(totalInterest!)}</div>
              </div>
              <div className="flex-1 p-4 rounded-md bg-primary/10">
                <div className="text-sm text-muted-foreground">Total Payment</div>
                <div className="text-lg font-semibold">{formatCurrency(totalPayment!)}</div>
              </div>
            </div>
            
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm">Interest</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
