"use client";
// import ShoppingCart from "@/components/shopping-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  MapPin,
  Phone,
  Search,
  ShoppingCart,
  ShoppingCartIcon,
  User
} from "lucide-react";
import Link from "next/link";
import CategoryNav from "./Category-nav";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const { items } = useCart();
 
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();


  const languages = [
    { code: "EN", name: "English" },
    { code: "FR", name: "Français" },
    { code: "ES", name: "Español" },
    { code: "DE", name: "Deutsch" },
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-lg">
      <div className="bg-orange-500 text-white text-sm py-2 px-4">
        <div className="w-full flex justify-between items-center px-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="h-6 w-6 mr-2" />
              <span className="text-lg">+250786885185</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-lg">dudufredu@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              <span className="text-lg">Ruhengeri-Musanze</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg">Tracker your order</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg">$Dollars</span>
            </div>
            <div className="relative group">
              <button
                className="flex items-center text-white hover:text-gray-200 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-lg">{selectedLanguage}</span>
                <ChevronDown
                  className={`h-6 w-6 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-4">
        <div className="w-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <div className="text-orange-500 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">EletronicZone</h1>
          </Link>

          <div className="w-full max-w-2xl mx-4 relative rounded-md group">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border-2 border-gray-300 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 ease-in-out text-3xl hover:border-orange-300"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 text-orange-500 hover:text-orange-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-r-2xl"
              >
                <Search className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-400" />
              </button>
            </form>
          </div>



          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-orange-500 hover:text-orange-600 transition-colors">
              <Button variant="ghost" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
              </Button>
            </Link>
            <Link href="/SignIn">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105">SignIn</Button>
            </Link>
            <div className="relative">
              <Link href="/Carts">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <CategoryNav />
    </div>
  );
}
