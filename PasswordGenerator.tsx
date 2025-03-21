
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Key, Copy, Check, RefreshCw } from "lucide-react";

const PasswordGenerator = () => {
  const { toast } = useToast();
  
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: "Weak", color: "bg-red-500" });

  // Generate password on initial render and when options change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Generate password function
  const generatePassword = () => {
    let charset = "";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    
    // Check if at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast({
        title: "Selection Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      setIncludeLowercase(true); // Default to lowercase if nothing selected
      return;
    }
    
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
    
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    
    setPassword(generatedPassword);
    setCopied(false);
    evaluatePasswordStrength(generatedPassword);
  };

  // Evaluate password strength
  const evaluatePasswordStrength = (pwd: string) => {
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    // Variety checks - ensure not just repeated characters
    const uniqueChars = new Set(pwd.split('')).size;
    if (uniqueChars > pwd.length * 0.6) score += 1;
    
    let label = "Weak";
    let color = "bg-red-500";
    
    if (score >= 7) {
      label = "Very Strong";
      color = "bg-green-500";
    } else if (score >= 5) {
      label = "Strong";
      color = "bg-blue-500";
    } else if (score >= 3) {
      label = "Moderate";
      color = "bg-yellow-500";
    }
    
    setPasswordStrength({ score, label, color });
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
      
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-stretch rounded-md bg-background shadow-sm border border-border overflow-hidden">
            <div className="flex-grow p-4 font-mono text-lg overflow-x-auto whitespace-nowrap">
              {password}
            </div>
            <div className="flex border-l border-border">
              <Button 
                variant="ghost" 
                className="rounded-none px-3 h-auto"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-none px-3 h-auto"
                onClick={generatePassword}
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-2 flex-grow rounded-full ${passwordStrength.color}`}></div>
            <span className="text-xs font-medium">{passwordStrength.label}</span>
          </div>
        </motion.div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Password Length</label>
              <span>{length} characters</span>
            </div>
            <Slider
              value={[length]}
              min={4}
              max={30}
              step={1}
              onValueChange={(value) => setLength(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>30</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Uppercase</label>
              <Switch 
                checked={includeUppercase} 
                onCheckedChange={setIncludeUppercase} 
                aria-label="Include uppercase letters"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Lowercase</label>
              <Switch 
                checked={includeLowercase} 
                onCheckedChange={setIncludeLowercase} 
                aria-label="Include lowercase letters"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Numbers</label>
              <Switch 
                checked={includeNumbers} 
                onCheckedChange={setIncludeNumbers} 
                aria-label="Include numbers"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Include Symbols</label>
              <Switch 
                checked={includeSymbols} 
                onCheckedChange={setIncludeSymbols} 
                aria-label="Include symbols"
              />
            </div>
          </div>
          
          <Button 
            onClick={generatePassword} 
            className="w-full gap-2"
            size="lg"
          >
            <Key className="w-4 h-4" />
            <span>Generate New Password</span>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground bg-primary/5 p-4 rounded-md">
          <p className="font-medium text-foreground mb-1">Password Security Tips</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a different password for each account</li>
            <li>Aim for at least 12 characters for better security</li>
            <li>Include a mix of characters, numbers, and symbols</li>
            <li>Consider using a password manager to store your passwords</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
