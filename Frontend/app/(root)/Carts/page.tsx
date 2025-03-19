"use client";
import {
  Computer,
  Smartphone,
  TvMonitor,
  GamingEquipment,
  Headphone,
  Speaker,
  Accessory,
} from "@/app/types/products";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/app/utils/products";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "date-fns";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const { toast } = useToast();
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNo: "",
    address: "",
    sector: "",
    cell: "",
    postalCode: "",
    landmark: "",
  });
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate form data
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.houseNo ||
        !formData.address ||
        !formData.sector ||
        !formData.cell
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Calculate shipping cost based on delivery option
      const shippingCost =
        deliveryOption === "standard"
          ? 0
          : deliveryOption === "express"
          ? 2
          : 25;

      const orderData = {
        product: items.map(item => item.name).join(", "),
        description: items.map(item => `${item.name} (${item.quantity})`).join(", "),
        price: getTotal() + shippingCost,
        category: items[0]?.category || "Mixed",
        status: "pending",
        paymentInfo: {
          amount: getTotal() + shippingCost,
          method: paymentMethod
        },
        customer: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: {
          houseNo: formData.houseNo,
          address: formData.address,
          sector: formData.sector,
          cell: formData.cell,
          postalCode: formData.postalCode,
          email: formData.email,
          phone: formData.phone
        },
        createdAt: new Date().toISOString()
      };

      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create order");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Order placed successfully!",
      });

      // Reset form and cart
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        houseNo: "",
        address: "",
        sector: "",
        cell: "",
        postalCode: "",
        landmark: "",
      });
      setShowing(false);
      setShowingDelivery(false);
      setPayment(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get a selection of products to show as recently viewed
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
  const [showing, setShowing] = useState(false);
  const [showingDelivery, setShowingDelivery] = useState(false);
  const [payment, setPayment] = useState(false);
  const handlePayment = () => {
    setShowingDelivery(!showingDelivery);
    setPayment(!payment);
  };
  const handlDelivery = () => {
    setShowing(!showing);
    setShowingDelivery(!showingDelivery);
  };
  const handleShow = () => {
    setShowing(!showing);
  };
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const subtotal = getTotal();
  const shippingPrice = 0; // FREE shipping
  const taxRate = 0.068; // 6.8%
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingPrice;

  return (
    <div className="container mt-48 mx-auto px-4 py-6">
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({items.length} items)
          </h2>
        </div>
        <div className=" flex w-full justify-between  space-y-4">
          <div className="w-1/2">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex w-full gap-4 p-4 m-2 border rounded-lg"
              >
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
                    <span className="text-orange-500 font-semibold">
                      ${item.price}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          className="px-3 py-1"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="w-12 text-center border-x ml-2"
                        />
                        <button
                          className="px-3 py-1"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`${
                items.length < 3 ? "hidden" : "mt-6 flex justify-center"
              }`}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
          {/* card items */}
          <div>
            {items.length > 0 && (
              <div className="flex flex-col md:flex-row justify-end gap-6 mb-12">
                {/* First summary box - removed as it's redundant with the shipping summary */}
                <div className="space-y-6 w-full md:w-72">
                  <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-xl font-bold mb-6">Shipping Summary</h2>

                    {/* Calculate values based on getTotal() */}
                    {(() => {
                      // const subtotal = getTotal();
                      // const shippingPrice = 0; // FREE shipping
                      // const taxRate = 0.068; // 6.8%
                      // const tax = subtotal * taxRate;
                      // const total = subtotal + tax + shippingPrice;

                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-[#FF4500] font-medium">
                              ${subtotal.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-[#FF4500] font-medium">
                              FREE
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Sales tax (6.8%)</span>
                            <span className="text-[#FF4500] font-medium">
                              ${tax.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between pt-4 border-t font-bold">
                            <span>Total</span>
                            <span className="text-[#FF4500]">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    <Button className="w-full mt-6 bg-[#FF4500] hover:bg-[#E03E00] text-white">
                      CHECKOUT
                    </Button>

                    <div className="text-center mt-4">
                      <Link href="/" className="text-[#FF4500]">
                        Back to Shopping
                      </Link>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Button
                      variant="outline"
                      className="w-full p-3 rounded-none border-0 font-medium justify-center"
                      onClick={handleShow}
                    >
                      PAYMENT OPTIONS
                    </Button>
                  </div>
                </div>
              </div>
              // </div>
            )}
          </div>
        </div>
        {/* deflout not founds */}
        {items.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}
      </div>
      {/* payment details */}
      {showing && (
        <div>
          <div className=" w-1/2 ml-64 mt-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#FF5722] text-white rounded-full flex items-center justify-center mr-2">
                  1
                </div>
                <span className="text-[#FF5722] font-medium">Addressing</span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gray-300 relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-[#FF5722]"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white text-gray-400 border border-gray-300 rounded-full flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-500 font-medium">Delivery</span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white text-gray-400 border border-gray-300 rounded-full flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-500 font-medium">Payments</span>
              </div>
            </div>

            {/* Shipping Form */}
            <div className="bg-white border rounded-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">First Name</label>
                  <Input type="text" className="w-full" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Last Name</label>
                  <Input type="text" className="w-full" />
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-2 font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full"
                />
              </div>

              <div className="mt-6">
                <label className="block mb-2 font-medium">Phone Number</label>
                <div className="flex">
                  <div className="w-24">
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <span>+250</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                  <Input type="tel" className="flex-1 ml-2" />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[#FF5722] font-medium mb-4">
                  Shipping Details
                </h3>

                <div className="mt-4">
                  <label className="block mb-2 font-medium">
                    Flat / House No
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: No. 123"
                    className="w-full"
                  />
                </div>

                <div className="mt-4">
                  <label className="block mb-2 font-medium">Address</label>
                  <Input
                    type="text"
                    placeholder="Ex:Musanze /Rwanda"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block mb-2 font-medium">Sector</label>
                    <Input
                      type="text"
                      placeholder="Ex:Ruhengeri"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Cell</label>
                    <Input
                      type="text"
                      placeholder="Ex:Burera"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block mb-2 font-medium">
                      Postal code
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex:0310"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Famous Landmark
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex:Nyakinama"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white py-3"
                  onClick={handlDelivery}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showingDelivery && (
        <div className=" w-1/2 ml-64">
          <div className="  mt-8">
            <div className=" flex items-center justify-between relative">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>
                <span className="mt-1 text-orange-600 font-medium">
                  Addressing
                </span>
              </div>
              <div className="flex-grow mx-4 h-1 bg-orange-600"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5" />
                </div>
                <span className="mt-1 text-orange-600 font-medium">
                  Delivery
                </span>
              </div>
              <div className="flex-grow mx-4 h-1 bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  <span>3</span>
                </div>
                <span className="mt-1 font-medium">Payments</span>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
            <h2 className="text-xl font-medium mb-6">Delivery Options</h2>
            <RadioGroup defaultValue="standard" className="space-y-4">
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center">
                  <RadioGroupItem
                    value="standard"
                    id="standard"
                    className="mr-3"
                  />
                  <label htmlFor="standard" className="font-medium">
                    Standard
                  </label>
                  <span className="ml-2 text-gray-600">5-7 Business Days</span>
                </div>
                <span className="text-orange-600 font-medium">FREE</span>
              </div>
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center">
                  <RadioGroupItem
                    value="express"
                    id="express"
                    className="mr-3"
                  />
                  <label htmlFor="express" className="font-medium">
                    2-4 Business Days
                  </label>
                </div>
                <span className="text-orange-600 font-medium">+$ 2</span>
              </div>
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center">
                  <RadioGroupItem
                    value="same-day"
                    id="same-day"
                    className="mr-3"
                  />
                  <label htmlFor="same-day" className="font-medium">
                    Same day Delivery
                  </label>
                </div>
                <span className="text-orange-600 font-medium">+$25</span>
              </div>
            </RadioGroup>
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="px-8"
                onClick={() => {
                  setShowing(true);
                  setShowingDelivery(false);
                }}
              >
                Back
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 px-8"
                onClick={handlePayment}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      {payment && (
        <div className=" w-1/2 ml-64 border-2 rounded-2xl">
          <div className="flex justify-center items-center gap-4 mt-8 ">
            <div className="flex items-center">
              <div className="text-orange-500 font-medium">Addressing</div>
              <div className="bg-orange-500 rounded-full p-1 ml-2">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="h-px bg-orange-500 w-16"></div>
            <div className="flex items-center">
              <div className="text-orange-500 font-medium">Delivery</div>
              <div className="bg-orange-500 rounded-full p-1 ml-2">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="h-px bg-orange-500 w-16"></div>
            <div className="flex items-center">
              <div className="text-orange-500 font-medium">Payments</div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-6">Payment Methods</h2>

            <RadioGroup defaultValue="delivery" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="delivery"
                  id="delivery"
                  className="text-orange-500"
                />
                <Label htmlFor="delivery" className="font-medium">
                  Pay on Delivery
                </Label>
              </div>
              <div className="pl-6 text-gray-500 -mt-4">
                Pay with cash on delivery
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="text-orange-500"
                  onClick={() => setShowCardForm(!showCardForm)}
                />
                <Label htmlFor="card" className="font-medium">
                  Credit /Debit Card
                </Label>
                <div className="flex gap-1">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                  <div className="w-6 h-6 bg-blue-700 rounded-sm"></div>
                  <div className="w-6 h-6 bg-blue-300 rounded-sm"></div>
                </div>
              </div>

              {showCardForm && (
                <div className="mt-4 p-4 border rounded-lg space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        value = value.replace(/(.{4})/g, "$1 ").trim();
                        e.target.value = value;
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expDate">Expiration Date</Label>
                      <Input
                        id="expDate"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2);
                          }
                          e.target.value = value;
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">Security Code (CVV)</Label>
                      <Input
                        id="cvv"
                        type="password"
                        maxLength={4}
                        placeholder="****"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="pl-6 text-gray-500 -mt-4">
                Pay with your Credit / Debit Card
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="bank"
                    id="bank"
                    className="text-orange-500"
                    onClick={() => {
                      setPaymentMethod("bank");
                      setShowCardForm(!showCardForm);
                    }}
                  />
                  <Label htmlFor="bank" className="font-medium">
                    Direct Bank Transfer
                  </Label>
                </div>
                {paymentMethod === "bank" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Bank Account Details
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>Bank: National Bank of Rwanda</p>
                        <p>Account Name: ElectronicZone Ltd</p>
                        <p>Account Number: 1234-5678-9012-3456</p>
                        <p>Swift Code: RNBKRWRW</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Bank Account Number
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your bank account number"
                        className="w-full"
                        value={formData.bankAccountNumber || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bankAccountNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="pl-6 text-gray-500 -mt-4">
                Make payment directly through bank accounts
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="other"
                  id="other"
                  className="text-orange-500"
                />
                <Label htmlFor="other" className="font-medium">
                  Other Payment Methods
                </Label>
              </div>
              <div className="pl-6 text-gray-500 -mt-4">
                Make payment through Momo , Gpay, paypal,paytm etc
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="px-8"
                onClick={() => {
                  setPayment(false);
                  setShowingDelivery(true);
                }}
              >
                Back
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 px-8">
                Pay ${total.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      )}
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
  );
}
