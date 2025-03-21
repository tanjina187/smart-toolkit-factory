
import { 
  Calculator, 
  Percent, 
  FileCog, 
  Calculator as EmiIcon, 
  CalendarDays, 
  CalendarClock, 
  TrendingUp, 
  Square, 
  ShoppingCart, 
  Mail, 
  QrCode, 
  Key, 
  Images, 
  FileImage, 
  FileText 
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

export const tools: Tool[] = [
  {
    id: "calculator",
    name: "Calculator",
    description: "Basic arithmetic operations",
    icon: Calculator,
    path: "/calculator",
    color: "bg-blue-50 text-blue-500 border-blue-100"
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages with ease",
    icon: Percent,
    path: "/percentage-calculator",
    color: "bg-purple-50 text-purple-500 border-purple-100"
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description: "Goods and Services Tax calculations",
    icon: FileCog,
    path: "/gst-calculator",
    color: "bg-green-50 text-green-500 border-green-100"
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate loan EMIs effortlessly",
    icon: EmiIcon,
    path: "/emi-calculator",
    color: "bg-indigo-50 text-indigo-500 border-indigo-100"
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate precise age from birthdate",
    icon: CalendarDays,
    path: "/age-calculator",
    color: "bg-amber-50 text-amber-500 border-amber-100"
  },
  {
    id: "date-difference",
    name: "Date Difference",
    description: "Find the gap between two dates",
    icon: CalendarClock,
    path: "/date-difference",
    color: "bg-orange-50 text-orange-500 border-orange-100"
  },
  {
    id: "profit-loss",
    name: "Profit Loss Calculator",
    description: "Calculate business profits and losses",
    icon: TrendingUp,
    path: "/profit-loss",
    color: "bg-emerald-50 text-emerald-500 border-emerald-100"
  },
  {
    id: "area-calculator",
    name: "Area Calculator",
    description: "Calculate areas of various shapes",
    icon: Square,
    path: "/area-calculator",
    color: "bg-teal-50 text-teal-500 border-teal-100"
  },
  {
    id: "ecommerce-profit",
    name: "eCommerce Profit",
    description: "Calculate online store profitability",
    icon: ShoppingCart,
    path: "/ecommerce-profit",
    color: "bg-cyan-50 text-cyan-500 border-cyan-100"
  },
  {
    id: "gmail-generator",
    name: "Gmail Generator",
    description: "Generate multiple Gmail variations",
    icon: Mail,
    path: "/gmail-generator",
    color: "bg-red-50 text-red-500 border-red-100"
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Create custom QR codes instantly",
    icon: QrCode,
    path: "/qr-code-generator",
    color: "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-100"
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure passwords",
    icon: Key,
    path: "/password-generator",
    color: "bg-rose-50 text-rose-500 border-rose-100"
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert images between formats",
    icon: Images,
    path: "/image-converter",
    color: "bg-sky-50 text-sky-500 border-sky-100"
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images without losing quality",
    icon: FileImage,
    path: "/image-compressor",
    color: "bg-violet-50 text-violet-500 border-violet-100"
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters and paragraphs",
    icon: FileText,
    path: "/word-counter",
    color: "bg-lime-50 text-lime-500 border-lime-100"
  }
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolByPath = (path: string): Tool | undefined => {
  return tools.find(tool => tool.path === path);
};
