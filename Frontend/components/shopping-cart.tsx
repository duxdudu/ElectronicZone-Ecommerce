"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/app/context/CartContext";
import Header from "@/app/components/header";
import Footer from "@/app/components/Footer";

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  const recentItems = [
    {
      id: 1,
      name: "ASUS Zenbook",
      category: "Laptops",
      originalPrice: 400.2,
      price: 380.4,
      rating: 4,
      reviews: 12,
      image: "/Business-Laptop.jpeg",
    },
    {
      id: 2,
      name: "Gaming Monitor",
      category: "Monitors",
      originalPrice: 500.2,
      price: 480.4,
      rating: 5,
      reviews: 8,
      image: "/gaming-monitor.jpg",
    },
    {
      id: 3,
      name: "Pro Gaming Headset",
      category: "Gaming",
      originalPrice: 200.2,
      price: 180.4,
      rating: 4,
      reviews: 15,
      image: "/Pro-Gaming-Headset.jpg",
    },
    {
      id: 4,
      name: "Wireless Controller",
      category: "Gaming",
      originalPrice: 150.2,
      price: 130.4,
      rating: 4,
      reviews: 10,
      image: "/Wireless Controller.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto mt-[90px] px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Shopping Cart ({items.length} items)</h2>
                <div className="flex gap-4">
                  <button className="text-[#FF4800]">UPDATE CART</button>
                  <button className="text-[#FF4800]">REMOVE ALL</button>
                </div>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-32 h-32 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[#FF4800] font-semibold">${item.price}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border rounded">
                            <button 
                              className="px-3 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              min="1"
                              value={item.quantity} 
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value >= 1) {
                                  updateQuantity(item.id, value);
                                }
                              }} 
                              className="w-12 text-center border-x" 
                            />
                            <button 
                              className="px-3 py-1"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Viewed */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Recently Viewed</h2>
              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  {recentItems.map((item) => (
                    <div key={item.id} className="min-w-[200px] space-y-2 border-2 rounded-lg p-3">
                      <div className="relative h-32">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-gray-400">${item.originalPrice}</span>
                        <span className="text-[#FF4800]">${item.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                        <span className="text-gray-600">({item.reviews})</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-6">
              <button className="w-full flex items-center justify-between p-4 border rounded-lg text-[#FF4800]">
                <span className="flex items-center gap-2">
                  <span className="text-xl">🎫</span>I have promo code
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#FF4800]">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#FF4800]">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (6.8%)</span>
                  <span className="text-[#FF4800]">${(getTotal() * 0.068).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-[#FF4800]">${(getTotal() * 1.068).toFixed(2)}</span>
                </div>
                <Button className="w-full bg-[#FF4800] hover:bg-[#FF4800]/90">CHECKOUT</Button>
                <Link href="/">
                  <Button variant="ghost" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <Button variant="outline" className="w-full">
                PAYMENT OPTIONS
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

