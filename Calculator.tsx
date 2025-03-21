import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tools } from "@/data/tools";
import { motion } from "framer-motion";

const calculator = tools.find(tool => tool.id === "calculator")!;

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ 
  value, 
  onClick, 
  className 
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-14 text-lg font-medium transition-all",
        "hover:bg-primary/5 active:scale-95",
        className
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");
  const [calculated, setCalculated] = useState(false);

  const handleButtonClick = (value: string) => {
    if (calculated) {
      setCalculated(false);
      if ("0123456789.".includes(value)) {
        setDisplay(value);
        setFormula(value);
        return;
      }
    }

    switch (value) {
      case "C":
        setDisplay("0");
        setFormula("");
        setCalculated(false);
        break;
      case "←":
        setDisplay(prevDisplay => {
          const newValue = prevDisplay.slice(0, -1) || "0";
          return newValue;
        });
        setFormula(prevFormula => {
          const newValue = prevFormula.slice(0, -1) || "";
          return newValue;
        });
        break;
      case "=":
        try {
          // eslint-disable-next-line no-eval
          const result = eval(formula.replace(/×/g, "*").replace(/÷/g, "/"));
          setDisplay(String(result));
          setFormula(prevFormula => `${prevFormula} = ${result}`);
          setCalculated(true);
        } catch (error) {
          setDisplay("Error");
          setTimeout(() => setDisplay("0"), 1000);
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        setFormula(prevFormula => {
          // Replace operators
          if (prevFormula.length && "+-×÷".includes(prevFormula[prevFormula.length - 1])) {
            return prevFormula.slice(0, -1) + value;
          }
          return prevFormula + value;
        });
        setDisplay("0");
        break;
      case ".":
        setDisplay(prevDisplay => {
          if (prevDisplay.includes(".")) return prevDisplay;
          return prevDisplay + ".";
        });
        setFormula(prevFormula => {
          // If the last character is an operator, add "0."
          if (prevFormula.length && "+-×÷".includes(prevFormula[prevFormula.length - 1])) {
            return prevFormula + "0.";
          }
          // If the current number already has a decimal point, do nothing
          const parts = prevFormula.split(/[+\-×÷]/);
          const lastPart = parts[parts.length - 1];
          if (lastPart.includes(".")) return prevFormula;
          // Otherwise, add the decimal point
          return prevFormula + ".";
        });
        break;
      default:
        setDisplay(prevDisplay => {
          if (prevDisplay === "0") return value;
          return prevDisplay + value;
        });
        setFormula(prevFormula => prevFormula + value);
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={cn("p-2 rounded-md", calculator.color)}>
            <CalculatorIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold">{calculator.name}</h1>
        </div>
        <p className="text-muted-foreground">{calculator.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="glass-darker overflow-hidden border-none">
          <div className="p-4 space-y-4">
            <div className="bg-background/50 rounded-lg border border-border/50 p-4 h-24 flex flex-col items-end justify-end">
              <div className="text-sm text-muted-foreground overflow-x-auto whitespace-nowrap w-full text-right mb-1">
                {formula}
              </div>
              <div className="text-4xl font-medium overflow-x-auto w-full text-right">
                {display}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <CalculatorButton value="C" onClick={handleButtonClick} className="bg-red-50 text-red-500 hover:bg-red-100" />
              <CalculatorButton value="(" onClick={handleButtonClick} />
              <CalculatorButton value=")" onClick={handleButtonClick} />
              <CalculatorButton value="←" onClick={handleButtonClick} />

              <CalculatorButton value="7" onClick={handleButtonClick} />
              <CalculatorButton value="8" onClick={handleButtonClick} />
              <CalculatorButton value="9" onClick={handleButtonClick} />
              <CalculatorButton value="÷" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />

              <CalculatorButton value="4" onClick={handleButtonClick} />
              <CalculatorButton value="5" onClick={handleButtonClick} />
              <CalculatorButton value="6" onClick={handleButtonClick} />
              <CalculatorButton value="×" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />

              <CalculatorButton value="1" onClick={handleButtonClick} />
              <CalculatorButton value="2" onClick={handleButtonClick} />
              <CalculatorButton value="3" onClick={handleButtonClick} />
              <CalculatorButton value="-" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />

              <CalculatorButton value="0" onClick={handleButtonClick} />
              <CalculatorButton value="." onClick={handleButtonClick} />
              <CalculatorButton value="=" onClick={handleButtonClick} className="bg-primary text-white hover:bg-primary/90" />
              <CalculatorButton value="+" onClick={handleButtonClick} className="bg-blue-50 text-blue-500 hover:bg-blue-100" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Calculator;
