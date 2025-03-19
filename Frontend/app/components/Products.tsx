import { ChevronLeft, ChevronRight, Download, Eye, FileEdit, Filter, Plus, Search, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from "next/link";

const DashProducts = () => {
  interface Category {
  id: string;
  name: string;
  productCount: number;
}

const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('Computers');
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:3002/products/category/Computers')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        // Create a mock categories array since we don't have a categories endpoint
        const mockCategories = [
          { id: 'Computers', name: 'Computers', productCount: data.length },
          { id: 'Smartphones', name: 'Smartphones', productCount: data.length },
          { id: 'TV & Monitors', name: 'TV & Monitors', productCount: data.length },
          { id: 'Gaming Equipment', name: 'Gaming Equipment', productCount: data.length },
          { id: 'Headphones', name: 'Headphones', productCount: data.length },
          { id: 'Speakers', name: 'Speakers', productCount: data.length },
          { id: 'Accessories', name: 'Accessories', productCount: data.length }
        ];
        setCategories(mockCategories);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3002/products/category/${selectedCategory}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => setProducts(data.map(p => ({
        id: p._id || p.id,
        name: p.name,
        price: p.price.toFixed(2),
        size: p.specifications?.size || '-',
        quantity: p.stockQuantity || 10,
        date: p.createdAt || new Date().toISOString(),
        status: (p.stockQuantity > 0 || p.inStock) ? 'Available' : 'Out of Stock',
        image: p.image || '/placeholder.svg'
      }))))
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div>
       <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Product</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
              <span className="mx-2">›</span>
              <Link href={`/dashboard/products/${selectedCategory}`} className="hover:text-blue-500">
                Product
              </Link>
              <span className="mx-2">›</span>
              <span className="text-blue-500">
              <Link href={`/dashboard/products/${selectedCategory}`} className="hover:text-blue-500">
              {categories.find(cat => cat.id === selectedCategory)?.name || 'Computers'}
              </Link>
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">Today</button>
              <button className="px-6 py-3 text-gray-500 hover:text-gray-700">Yesterday</button>
              <button className="px-6 py-3 text-gray-500 hover:text-gray-700">Week</button>
              <button className="px-6 py-3 text-gray-500 hover:text-gray-700">Month</button>
            </div>

            {/* Search and Actions */}
            <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search for id, name product"
                  className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 border rounded-md flex items-center gap-2 text-gray-700 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2 border rounded-md flex items-center gap-2 text-gray-700 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <Link href="/dashboard/products/AddProducts">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600">
                  <Plus className="w-4 h-4" />
                  <span>New Product</span>
                </button>
                </Link>
                
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-4 border-b">
              <div className="flex overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {category.name} ({category.productCount})
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left w-10">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Product
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Price
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Size
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      QTY
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Date
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Status
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      Action
                      <svg
                        className="inline-block ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6b7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No products found in this category
                </td>
              </tr>
            ) : products.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded">
                            <Image
                              src={product.image}
                              width={32}
                              height={32}
                              alt={product.name}
                            />
                          </div>
                          <div>
                            <div className="text-xs text-blue-500">{product.id}</div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">{product.size}</td>
                      <td className="p-4">{product.quantity}</td>
                      <td className="p-4">
                        <div>{new Date(product.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(product.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${product.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-gray-500 hover:text-blue-500">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-blue-500">
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-500 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between border-t">
              <div className="text-sm text-gray-500">1 - 10 of 13 Pages</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500">The page on</div>
                <div className="relative w-16">
                  <select className="w-full appearance-none border rounded px-2 py-1 pr-8 text-sm">
                    <option>1</option>
                    <option>2</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <button className="p-1 border rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 border rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DashProducts