// import ShoppingCart from "@/components/shopping-cart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, Bell, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderDashboard() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
        <Link href='/' ><div className="p-4 border-b flex items-center gap-2">
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
      </div></Link>
      
      <div className="relative w-[400px]">
        <Input
          placeholder="Search product"
          className="pl-3 pr-10 py-2 rounded-full border-gray-300"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-orange-100 transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-orange-500" />
          </Button>
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-medium rounded-full">
            3
          </span>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-orange-100 transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-gray-600 hover:text-orange-500" />
          </Button>
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-orange-500 text-white text-xs font-medium rounded-full">
            5
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MacBook%20Pro%2016_%20-%209%20%281%29-iym7LyON9fAUtGm4QPh4nZyeGhJLn9.png"
              alt="User"
            />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Dux dudu</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
