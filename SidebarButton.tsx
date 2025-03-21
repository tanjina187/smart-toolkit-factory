
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarButtonProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  isSidebarOpen, 
  toggleSidebar 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "fixed z-30 flex items-center justify-center",
        "transition-all duration-300 ease-out",
        isMobile 
          ? "top-4 left-4 h-10 w-10 rounded-full glass shadow-glass" 
          : "top-4 left-4 h-10 w-10 rounded-full glass shadow-glass",
        !isSidebarOpen && "shadow-glass-lg hover:shadow-glass-xl"
      )}
    >
      {isSidebarOpen ? (
        <ChevronRight className="w-5 h-5" />
      ) : (
        <Menu className="w-5 h-5" />
      )}
    </button>
  );
};

export default SidebarButton;
