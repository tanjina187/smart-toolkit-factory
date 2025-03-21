
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { tools } from "@/data/tools";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(isSidebarOpen);
  
  // Handle animation timing
  useEffect(() => {
    if (isSidebarOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  if (!isVisible && !isSidebarOpen) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 glass-darker",
          "border-r border-border/50 flex flex-col",
          "transition-all duration-300 ease-out",
          isSidebarOpen ? "translate-x-0 shadow-glass-lg" : "-translate-x-full",
          isMobile ? "w-64" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="bg-primary/10 text-primary rounded-md p-1">
              <Home className="w-5 h-5" />
            </div>
            <span>SmartToolkit</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="rounded-full p-1.5 hover:bg-background/80"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-xs font-medium text-muted-foreground pl-3 mb-2">Tools</p>
          <div className="space-y-1">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                  "transition-colors duration-200",
                  location.pathname === tool.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-accent/50 text-foreground/80"
                )}
              >
                <tool.icon className="w-4 h-4 flex-shrink-0" />
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-border/50 text-xs text-center text-muted-foreground">
          <p>SmartToolkit © {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
