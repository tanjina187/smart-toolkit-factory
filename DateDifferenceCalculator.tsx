
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, isAfter } from "date-fns";

const DateDifferenceCalculator = () => {
  const { toast } = useToast();
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showStartCalendar, setShowStartCalendar] = useState(true);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [dateResult, setDateResult] = useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    totalDays: number;
  } | null>(null);

  const calculateDateDifference = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Input Error",
        description: "Please select both dates",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate the various differences
    const years = differenceInYears(endDate, startDate);
    const months = differenceInMonths(endDate, startDate);
    const weeks = differenceInWeeks(endDate, startDate);
    const days = differenceInDays(endDate, startDate);
    const hours = differenceInHours(endDate, startDate);
    
    setDateResult({
      years,
      months,
      weeks,
      days,
      hours,
      totalDays: days
    });
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setShowStartCalendar(false);
      setShowEndCalendar(true);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    setShowEndCalendar(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <div className="border border-border rounded-md p-3">
                {startDate && !showStartCalendar ? (
                  <div className="flex justify-between items-center">
                    <span>{format(startDate, 'PPP')}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setShowStartCalendar(true);
                        setShowEndCalendar(false);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : showStartCalendar && (
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateSelect}
                    initialFocus
                  />
                )}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <div className="border border-border rounded-md p-3">
                {endDate && !showEndCalendar ? (
                  <div className="flex justify-between items-center">
                    <span>{format(endDate, 'PPP')}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setShowEndCalendar(true);
                        setShowStartCalendar(false);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : showEndCalendar && (
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateSelect}
                    disabled={(date) => startDate ? isAfter(startDate, date) : false}
                    initialFocus
                  />
                )}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={calculateDateDifference} 
            className="w-full"
            disabled={!startDate || !endDate}
          >
            Calculate Difference
          </Button>
        </div>
        
        {dateResult && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-md bg-primary/10">
              <h3 className="font-medium mb-3">Date Difference</h3>
              <div className="text-xl font-bold mb-2">
                {dateResult.days} days
              </div>
              <p className="text-sm text-muted-foreground">
                From {format(startDate!, 'PPP')} to {format(endDate!, 'PPP')}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Years</span>
                  <span className="font-semibold">{dateResult.years}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Months</span>
                  <span className="font-semibold">{dateResult.months}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weeks</span>
                  <span className="font-semibold">{dateResult.weeks}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours</span>
                  <span className="font-semibold">{dateResult.hours}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;
