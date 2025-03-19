"use client";
import { Button } from "@/components/ui/button";
import { Badge, ChevronDown, ChevronLeft, ChevronRight, Grid, Heart, List, Share2, Star } from "lucide-react";
import Image from "next/image";
import { getAllProducts, getProductsByCategory } from "../utils/products";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

export default function Home() {
  const { addItem } = useCart();
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const itemsPerPage = 12;
  const images = [
    { src: "/Frame1.png", alt: "Electronics devices 1" },
    { src: "/frame2.png", alt: "Electronics devices 2" },
    { src: "/frame3.png", alt: "Electronics devices 3" },
  ];
  const [fadeIn, setFadeIn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recentlyViewed, setRecentlyViewed] = useState<
  (
    | Computer
    | Smartphone
    | TvMonitor
    | GamingEquipment
    | Headphone
    | Speaker
    | Accessory
  )[]
>([]);
useEffect(() => {
  // In a real app, this would come from user browsing history
  // For now, we'll just get a random selection of products
  const fetchProducts = async () => {
    const allProducts = await getAllProducts();
    const randomProducts = [...allProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRecentlyViewed(randomProducts);
  };
  fetchProducts();
}, []);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = selectedCategory === "all" 
          ? await getAllProducts()
          : await getProductsByCategory(selectedCategory);
        setProducts(data);
        // Filter products based on search query
        const filtered = data.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true);
      }, 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const categories = [
    { name: "Computers", count: 45 },
    { name: "Smartphones", count: 21 },
    { name: "TV & Monitors", count: 32 },
    { name: "Gaming Equipment", count: 100 },
    { name: "Headphones", count: 44 },
    { name: "Speakers", count: 30 },
    { name: "Accessories", count: 45 },
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };
  return (
    <div className={`w-full ${theme === 'dark' ? 'bg-dark-background text-dark-foreground' : ''}`}>
      <main className={`w-full flex-1 py-6 ${theme === 'dark' ? 'bg-dark-background' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
         
            {/* Sidebar categories */}
            <div className=" flex gap-6">
             <div className="w-72 bg-white rounded-2xl shadow p-4 h-fit">
              <h3 className=" text-2xl font-semibold mb-4">Show all categories</h3>
              <ul className="space-y-2 text-sm">
                <li
                  className={`flex justify-between cursor-pointer hover:text-orange-500 ${
                    selectedCategory === "all" ? "text-orange-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                >
                  <span className=" text-lg">All Products</span>
                  <span className="text-gray-500">
                    ({products.length})
                  </span>
                </li>
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={`text-lg flex justify-between cursor-pointer hover:text-orange-500 ${
                      selectedCategory === category.name.toLowerCase()
                        ? "text-orange-500"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.name.toLowerCase());
                      setCurrentPage(1);
                    }}
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-500">({category.count})</span>
                  </li>
                ))}
              </ul>
            </div> 

            <div className="bg-white rounded-xl shadow p-6 mb-8 border border-orange-100 flex items-center h-auto">
                <div className="w-full flex justify-end">
                  <div className="relative">
                    <Image
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      width={800}
                      height={100}
                      className={`object-contain transition-all duration-300 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            

          

              {/* Products grid */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedCategory === "all"
                    ? "All Products"
                    : `${
                        selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)
                      }`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {currentProducts.map((product) => (
                    <div
                      key={product?.id || Math.random()}
                      className={`${theme === 'dark' ? 'bg-dark-secondary text-dark-foreground border-dark-muted' : 'bg-white border-gray-100'} rounded-2xl shadow-lg overflow-hidden hover:shadow-lg transition-shadow border-2`}>
                      <div className="relative h-40">
                        <Image
                          src={product?.image ? `${API_BASE_URL}${product.image}` : "/placeholder.svg"}
                          alt={product?.name ?? "Product image"}
                          fill
                          className="object-contain w-full h-full"
                          style={{ objectFit: "contain" }}
                        />
                        <div className="absolute top-2 right-2 space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="bg-white/80 hover:bg-white"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {product.discount && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {product.description}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.inStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-orange-500">
                            ${product.price.toFixed(2)}
                          </span>
                          <Button 
                            className={`${product.inStock ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-2xl`}
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
              <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border p-4">
                <div className="aspect-video relative mb-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-[#FF4500] font-medium">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-sm ml-1">
                      ({(item as any).rating || 0})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 p-0 rounded-full bg-white border shadow-sm z-10 hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 p-0 rounded-full bg-white border shadow-sm z-10 hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
            
        </div>
      </main>
    </div>
  );

}

