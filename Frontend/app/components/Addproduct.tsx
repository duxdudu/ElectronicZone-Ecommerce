import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image } from "lucide-react";
import Link from "next/link";
import { useProductForm } from "@/app/hooks/useProductForm";

export default function AddProductComponent() {
  const {
    formData,
    loading,
    error,
    imagePreview,
    handleChange,
    handleImageChange,
    handleSubmit,
    setFormData
  } = useProductForm();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">Product</h1>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href="/dashboard/products" className="hover:text-blue-500">
                <span>Product</span>
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href="/dashboard/products" className="hover:text-blue-500">
                <span>Computers</span>
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-blue-500">Add Product</span>
            </div>
          </div>
  
          <Tabs defaultValue="today" className="mb-6">
            <TabsList className="grid grid-cols-4 w-[400px]">
              <TabsTrigger
                value="today"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Today
              </TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Product Information</h2>
              <p className="text-gray-500 text-sm mb-6">
                Fill in the product details below to add a new item to your inventory.
                All fields marked with an asterisk (*) are required.
              </p>
  
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Input product name"
                    required
                  />
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Product Category
                    </label>
                    <Select name="category" value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computers">Computers</SelectItem>
                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                        <SelectItem value="TV & Monitors">TV & Monitors</SelectItem>
                        <SelectItem value="Gaming Equipment">Gaming Equipment</SelectItem>
                        <SelectItem value="Headphones">Headphones</SelectItem>
                        <SelectItem value="Speakers">Speakers</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <Input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Input price"
                      type="number"
                      required
                    />
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <Input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Input stock"
                    type="number"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status Product
                  </label>
                  <Select name="status" value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="outofstock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Input product description"
                    required
                  />
                </div>
              </div>
            </Card>
  
            {/* Image Product */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Image Product</h2>
              <div className="flex items-center mb-6">
                <p className="text-sm text-blue-500 font-medium mr-1">Note :</p>
                <p className="text-sm text-gray-500">
                  Format photos SVG, PNG, or JPG (Max size 4mb)
                </p>
              </div>
  
              <div className="grid grid-cols-4 gap-4">
                <div
                  className="border border-dashed border-blue-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('imageInput')?.click()}
                >
                  <input
                    type="file"
                    id="imageInput"
                    accept=".svg,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="w-12 h-12 flex items-center justify-center text-blue-400 mb-2">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <Image className="w-6 h-6" />
                    )}
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    {imagePreview ? 'Change Photo' : 'Upload Photo'}
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Product'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm p-4">{error}</div>}
      </form>
    </div>
  );
}
