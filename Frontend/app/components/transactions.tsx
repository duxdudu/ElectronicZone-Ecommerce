"use client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash,
  X,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Transactions() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "Computers",
    inStock: true,
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/products${activeTab !== "all" ? `?status=${activeTab}` : ""}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const orderData = {
        product: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        status: "pending",
        paymentInfo: {
          amount: newProduct.price,
          method: "pending"
        },
        customer: "Customer Name", // This should be dynamically set based on your requirements
        createdAt: new Date().toISOString()
      };
  
      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
  
      const data = await response.json();
  
      toast({
        title: "Order created successfully",
        description: `Order #${data.id} has been created.`,
        variant: "default"
      });
  
      setIsDialogOpen(false);
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "Computers",
        inStock: true,
        rating: 0,
        reviews: 0
      });
      
      // Refresh the orders list
      fetchOrders();
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive"
      });
    };
  };

  const handleViewOrder = (order: any) => {
    // Implement view order logic
    toast({
      title: "View Order",
      description: `Viewing order ${order.id}`,
      variant: "default",
    });
  };

  const handleEditOrder = (order: any) => {
    // Implement edit order logic
    toast({
      title: "Edit Order",
      description: `Editing order ${order.id}`,
      variant: "default",
    });
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/products/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete order");

      toast({
        title: "Success",
        description: `Order ${orderId} has been deleted.`,
        variant: "default",
      });
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Orders</h1>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/dashboard/Transactions"
              className="hover:text-blue-600"
            >
              Orders
            </Link>
            <ChevronRight size={14} />
            <span className="text-blue-600">All Orders</span>
          </div>
        </div>

        {/* Time Filter */}
        <div className="bg-gray-100 rounded-lg p-1 inline-flex mb-6">
          <button
            className={`px-6 py-1.5 rounded-md ${
              activeTab === "today" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <button
            className={`px-6 py-1.5 rounded-md ${
              activeTab === "yesterday" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("yesterday")}
          >
            Yesterday
          </button>
          <button
            className={`px-6 py-1.5 rounded-md ${
              activeTab === "week" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("week")}
          >
            Week
          </button>
          <button
            className={`px-6 py-1.5 rounded-md ${
              activeTab === "month" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("month")}
          >
            Month
          </button>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between mb-4">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search for id, name product"
              className="w-full pl-3 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-2.5">
              <Search size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="flex gap-2">
            <button className="border rounded-md px-4 py-2 text-sm flex items-center gap-1">
              <Filter size={16} />
              Filter
            </button>
            <button className="border rounded-md px-4 py-2 text-sm flex items-center gap-1">
              <Download size={16} />
              Export
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm flex items-center gap-1">
                  <Plus size={16} />
                  New Order
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      className="col-span-3"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      className="col-span-3"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, category: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computers">Computers</SelectItem>
                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                        <SelectItem value="TV & Monitors">
                          TV & Monitors
                        </SelectItem>
                        <SelectItem value="Gaming Equipment">
                          Gaming Equipment
                        </SelectItem>
                        <SelectItem value="Headphones">Headphones</SelectItem>
                        <SelectItem value="Speakers">Speakers</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="inStock" className="text-right">
                      In Stock
                    </Label>
                    <Select
                      value={newProduct.inStock.toString()}
                      onValueChange={(value) =>
                        setNewProduct({
                          ...newProduct,
                          inStock: value === "true",
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select stock status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">In Stock</SelectItem>
                        <SelectItem value="false">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleCreateProduct}>
                    Create Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Order Tabs */}
        <div className="border rounded-md mb-4">
          <div className="flex">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "all"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Orders
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "pending"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "processing"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("processing")}
            >
              Processing
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "shipped"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("shipped")}
            >
              Shipped
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="w-10 p-3">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Orders
                    <ChevronDown size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Customer
                    <ChevronDown size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Price
                    <ChevronDown size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Date
                    <ChevronDown size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Payment
                    <ChevronDown size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Status
                    <Filter size={14} />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    Action
                    <Filter size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package size={20} className="text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">{order.product}</div>
                          <div className="text-sm text-gray-500">
                            #{order.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{order.customer}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">
                        ${(order as any).paymentInfo.amount}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-500">
                        {new Date(
                          (order as any).createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="capitalize">
                          {(order as any).paymentInfo.method}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (order as any).status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : (order as any).status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : (order as any).status === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {(order as any).status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditOrder(order)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteOrder((order as any).id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
