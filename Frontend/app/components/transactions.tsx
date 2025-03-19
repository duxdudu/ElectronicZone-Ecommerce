import { ChevronDown, ChevronLeft, ChevronRight, Download, Eye, Filter, Pencil, Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Transactions(){
    const [activeTab, setActiveTab] = useState("all")
    const [darkMode, setDarkMode] = useState(false)
    return(
        <div>
            <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Orders</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <ChevronRight size={14} />
              <Link href="/dashboard/Transactions" className="hover:text-blue-600">
                Orders
              </Link>
              <ChevronRight size={14} />
              <span className="text-blue-600">All Orders</span>
            </div>
          </div>

          {/* Time Filter */}
          <div className="bg-gray-100 rounded-lg p-1 inline-flex mb-6">
            <button
              className={`px-6 py-1.5 rounded-md ${activeTab === "today" ? "bg-white shadow-sm" : ""}`}
              onClick={() => setActiveTab("today")}
            >
              Today
            </button>
            <button
              className={`px-6 py-1.5 rounded-md ${activeTab === "yesterday" ? "bg-white shadow-sm" : ""}`}
              onClick={() => setActiveTab("yesterday")}
            >
              Yesterday
            </button>
            <button
              className={`px-6 py-1.5 rounded-md ${activeTab === "week" ? "bg-white shadow-sm" : ""}`}
              onClick={() => setActiveTab("week")}
            >
              Week
            </button>
            <button
              className={`px-6 py-1.5 rounded-md ${activeTab === "month" ? "bg-white shadow-sm" : ""}`}
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
              />
              <button className="absolute right-3 top-2.5">
                <Search  size={16} className="text-gray-400" />
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
              <button className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm flex items-center gap-1">
                <Plus size={16} />
                New Order
              </button>
            </div>
          </div>

          {/* Order Tabs */}
          <div className="border rounded-md mb-4">
            <div className="flex">
              <button
                className={`flex-1 py-2 text-center ${activeTab === "all" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
                onClick={() => setActiveTab("all")}
              >
                All Orders (441)
              </button>
              <button
                className={`flex-1 py-2 text-center ${activeTab === "shipping" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping (100)
              </button>
              <button
                className={`flex-1 py-2 text-center ${activeTab === "completed" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
                onClick={() => setActiveTab("completed")}
              >
                Completed (300)
              </button>
              <button
                className={`flex-1 py-2 text-center ${activeTab === "cancel" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500" : "text-gray-600"}`}
                onClick={() => setActiveTab("cancel")}
              >
                Cancel (41)
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
                {[
                  {
                    id: "021231",
                    product: "Kanky Kitadakate (Green)",
                    price: "$212.78",
                    status: "Shipping",
                    payment: "Paid",
                  },
                  {
                    id: "021231",
                    product: "Kanky Kitadakate (Green)",
                    price: "$231.78",
                    status: "Cancelled",
                    payment: "Unpaid",
                  },
                  {
                    id: "021231",
                    product: "Kanky Kitadakate (Green)",
                    price: "$341.78",
                    status: "Shipping",
                    payment: "Paid",
                  },
                  {
                    id: "021231",
                    product: "Story Honzo (Cream)",
                    price: "$141.78",
                    status: "Shipping",
                    payment: "Paid",
                  },
                  {
                    id: "021231",
                    product: "Kanky Kitadakate (Green)",
                    price: "$51.78",
                    status: "Cancelled",
                    payment: "Unpaid",
                  },
                  {
                    id: "021231",
                    product: "Kanky Kitadakate (Green)",
                    price: "$211.78",
                    status: "Shipping",
                    payment: "Paid",
                  },
                  {
                    id: "021231",
                    product: "Beige Coffe (Navy)",
                    price: "$291.78",
                    status: "Cancelled",
                    payment: "Unpaid",
                  },
                  {
                    id: "021231",
                    product: "Story Honzo (Cream)",
                    price: "$391.78",
                    status: "Cancelled",
                    payment: "Unpaid",
                  },
                ].map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=${index}`}
                            width={40}
                            height={40}
                            alt="Product"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-blue-500">{order.id}</p>
                          <p className="text-sm">{order.product}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">duxdudu</td>
                    <td className="p-3 text-sm">{order.price}</td>
                    <td className="p-3 text-sm">04/17/23</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${order.payment === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${order.status === "Shipping" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-500 hover:text-blue-500">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-blue-500">
                          <Pencil size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-500">
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between text-sm">
              <div>1 - 10 of 13 Pages</div>
              <div className="flex items-center gap-2">
                <span>The page on</span>
                <div className="flex items-center border rounded">
                  <button className="px-2 py-1 border-r flex items-center gap-1">
                    1 <ChevronDown size={14} />
                  </button>
                  <button className="px-2 py-1 text-gray-400">
                    <ChevronLeft size={14} />
                  </button>
                  <button className="px-2 py-1 border-l">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
    )
}