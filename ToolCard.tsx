
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, className }) => {
  return (
    <Link
      to={tool.path}
      className={cn(
        "relative overflow-hidden glass rounded-xl p-6 transition-all duration-300",
        "hover:shadow-glass-lg hover:-translate-y-1",
        "group flex flex-col items-center justify-center text-center h-full",
        className
      )}
    >
      <div 
        className={cn(
          "p-3 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110", 
          tool.color
        )}
      >
        <tool.icon className="w-6 h-6" />
      </div>
      <h3 className="font-medium text-lg mb-1">{tool.name}</h3>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-300" />
    </Link>
  );
};

export default ToolCard;
