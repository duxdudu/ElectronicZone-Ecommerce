import {
  BarChart2,
  FileText,
  HelpCircle,
  Home,
  Package,
  Settings,
  Users,
} from "lucide-react";
// import { NavItem } from '@/components/NavItem';
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavItem } from "./NavItem";
export default function Sidebar() {
  return (
    <div className="w-[220px] border-r flex flex-col h-[790px]">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="text-orange-500">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L6 6V10C6 15.5 8.5 20 12 22C15.5 20 18 15.5 18 10V6L12 2Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12L10 14L16 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold">ElectronicZone</h1>
      </div>

      <div className="py-4">
        <div className="px-4 py-2 text-sm text-gray-500 font-medium">
          GENERAL
        </div>
        <div className="space-y-1">
          <NavItem icon={<Home size={18} />} label="Dashboard" active />
          <NavItem
            icon={<Package size={18} />}
            label="Product (119)"
            hasDropdown
          />
          <NavItem icon={<FileText size={18} />} label="Transaction (441)" />
          <NavItem icon={<Users size={18} />} label="Customers" />
          <NavItem icon={<BarChart2 size={18} />} label="Sales Report" />
        </div>

        <div className="mt-6 px-4 py-2 text-sm text-gray-500 font-medium">
          TOOLS
        </div>
        <div className="space-y-1">
          <NavItem icon={<Settings size={18} />} label="Account & Settings" />
          <NavItem icon={<HelpCircle size={18} />} label="Help" />
        </div>
      </div>

      <div className="mt-auto p-4 border-t flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MacBook%20Pro%2016_%20-%209%20%281%29-iym7LyON9fAUtGm4QPh4nZyeGhJLn9.png"
            alt="User"
          />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Dux-dudu</div>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs px-2 mt-1 text-orange-500 border-orange-500"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
