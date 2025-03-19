"use client";
import { getProductsByCategory } from "@/app/utils/products";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";

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
export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, items, updateQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory("Accessories");
        setProducts(data);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  // const handleRemoveFromCart = (productId: string | number) => {
  //   const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
  //   const item = items.find((item) => item.id === numericId);
  //   if (item && item.quantity > 1) {
  //     updateQuantity(numericId, item.quantity - 1);
  //   } else if (item && item.quantity === 1) {
  //     updateQuantity(numericId, 0);
  //   }
  // };

  if (loading) {
    return (
      <div>
        
        <div className="container mt-48 mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
        
      </div>
    );
  }

  if (error) {
    return (
      <div>
        
        <div className="container mt-48 mx-auto px-4 py-6">
          <div className="text-center text-red-500">
            <p>Error loading products: {error}</p>
          </div>
        </div>
       
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-48 mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Accessories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative pt-[100%] w-full bg-gray-50">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/90 hover:bg-white shadow-sm"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-${i < product.rating ? "yellow" : "gray"}-400`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">
                      ${product.price.toFixed(2)}
                    </span>
                  
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
