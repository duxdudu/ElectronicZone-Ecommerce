"use client";
import { useCart } from "@/app/context/CartContext";
import { getProductsByCategory } from "@/app/utils/products";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";
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

export default function GamingEquipmentPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, items, updateQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory("Gaming Equipment");
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

  const handleRemoveFromCart = (productId: string | number) => {
    const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
    const item = items.find((item) => item.id === numericId);
    if (item && item.quantity > 1) {
      updateQuantity(numericId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      updateQuantity(numericId, 0);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mt-48 mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container mt-48 mx-auto px-4 py-6">
          <div className="text-center text-red-500">
            <p>Error loading products: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mt-48 mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Gaming Equipment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
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
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-${i < product.rating ? "yellow" : "gray"}-400`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-600 text-sm ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-500">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
