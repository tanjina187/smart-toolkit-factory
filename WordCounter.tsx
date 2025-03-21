
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const WordCounter = () => {
  const { toast } = useToast();
  
  const [text, setText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [charNoSpaceCount, setCharNoSpaceCount] = useState<number>(0);
  const [lineCount, setLineCount] = useState<number>(0);
  const [sentenceCount, setSentenceCount] = useState<number>(0);
  const [paragraphCount, setParagraphCount] = useState<number>(0);
  const [readingTime, setReadingTime] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Update counts when text changes
  useEffect(() => {
    countText(text);
  }, [text]);

  // Count various text metrics
  const countText = (input: string) => {
    // Word count (trim to avoid counting spaces as words)
    const words = input.trim() ? input.trim().split(/\s+/) : [];
    setWordCount(words.length);
    
    // Character count
    setCharCount(input.length);
    
    // Character count without spaces
    setCharNoSpaceCount(input.replace(/\s/g, "").length);
    
    // Line count
    const lines = input.split(/\r\n|\r|\n/);
    setLineCount(lines.length);
    
    // Sentence count
    const sentences = input.split(/[.!?]+/).filter(Boolean);
    setSentenceCount(sentences.length);
    
    // Paragraph count
    const paragraphs = input.split(/\n\s*\n/).filter(Boolean);
    setParagraphCount(paragraphs.length > 0 ? paragraphs.length : 0);
    
    // Reading time (average 200-250 words per minute)
    const wordsPerMinute = 225;
    setReadingTime(Math.ceil(words.length / wordsPerMinute));
  };

  // Clear text
  const clearText = () => {
    setText("");
    toast({
      title: "Cleared",
      description: "Text has been cleared",
    });
  };

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Enter your text</label>
            <div className="text-xs text-muted-foreground">
              {charCount} characters
            </div>
          </div>
          <Textarea
            placeholder="Type or paste your text here..."
            className="min-h-[200px] font-mono"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-between gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={clearText}
              disabled={!text}
            >
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!text}
              className="gap-1"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>Copy</span>
            </Button>
          </div>
        </div>
        
        {wordCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Words</div>
                <div className="text-xl font-bold">{wordCount}</div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Characters</div>
                <div className="text-xl font-bold">{charCount}</div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Without Spaces</div>
                <div className="text-xl font-bold">{charNoSpaceCount}</div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Sentences</div>
                <div className="text-xl font-bold">{sentenceCount}</div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Paragraphs</div>
                <div className="text-xl font-bold">{paragraphCount}</div>
              </div>
              
              <div className="p-3 rounded-md bg-primary/5">
                <div className="text-sm text-muted-foreground">Reading Time</div>
                <div className="text-xl font-bold">{readingTime} min</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Text Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-md bg-primary/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Word Length</span>
                    <span className="font-medium">
                      {wordCount > 0 
                        ? (charNoSpaceCount / wordCount).toFixed(2) 
                        : "0"} chars
                    </span>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-primary/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Words per Sentence</span>
                    <span className="font-medium">
                      {sentenceCount > 0 
                        ? (wordCount / sentenceCount).toFixed(2) 
                        : "0"} words
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WordCounter;
