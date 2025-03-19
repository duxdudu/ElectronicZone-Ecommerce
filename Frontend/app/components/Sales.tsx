
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {

    Bell,
    ChevronDown,
    HelpCircle,
    Home,
    LineChart,
    Package,
    Search,
    Settings,
    ShoppingCart,
    TrendingUp,
    Users,
  } from "lucide-react"
  import Image from "next/image"
export default function SalesDash(){
    return(
        <div className="flex-1 overflow-auto">
        

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Sales Reports</h1>

          {/* Sales Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold">$1,234,567</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +12.5% from last month
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Average Order Value</div>
              <div className="text-2xl font-bold">$245.80</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +5.2% from last month
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Total Orders</div>
              <div className="text-2xl font-bold">5,024</div>
              <div className="flex items-center text-sm text-red-500 mt-1">
                <svg className="w-4 h-4 mr-1 transform rotate-180" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                -2.3% from last month
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
              <div className="text-2xl font-bold">3.42%</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +0.8% from last month
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-6">
            <div className="flex rounded-lg overflow-hidden border">
              <button className="px-8 py-2 bg-blue-500 text-white">Today</button>
              <button className="px-8 py-2 bg-gray-100">Yesterday</button>
              <button className="px-8 py-2 bg-gray-100">Week</button>
              <button className="px-8 py-2 bg-gray-100">Month</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2 border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">$50.4K</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1 font-normal"
                  >
                    <TrendingUp className="h-3 w-3" />
                    5% than last month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <div className="flex h-full items-end gap-2">
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[80%]"></div>
                      <div className="w-8 bg-gray-200 h-[60%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Jan</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[65%]"></div>
                      <div className="w-8 bg-gray-200 h-[45%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Feb</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[70%]"></div>
                      <div className="w-8 bg-gray-200 h-[30%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Mar</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[60%]"></div>
                      <div className="w-8 bg-gray-200 h-[70%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Apr</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[65%]"></div>
                      <div className="w-8 bg-gray-200 h-[45%]"></div>
                      <div className="text-xs text-gray-500 mt-1">May</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[40%]"></div>
                      <div className="w-8 bg-gray-200 h-[30%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Jun</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[60%]"></div>
                      <div className="w-8 bg-gray-200 h-[40%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Jul</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[65%]"></div>
                      <div className="w-8 bg-gray-200 h-[40%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Aug</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-full">
                      <div className="w-8 bg-blue-500 h-[60%]"></div>
                      <div className="w-8 bg-gray-200 h-[45%]"></div>
                      <div className="text-xs text-gray-500 mt-1">Sep</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <div>0</div>
                  <div>20k</div>
                  <div>40k</div>
                  <div>60k</div>
                  <div>80k</div>
                  <div>100k</div>
                </div>
              </CardContent>
            </Card>

            {/* Most Sold Items */}
            <div className="bg-white p-4 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Most Sold Items</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Laptop & Computer</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">TV & Monitor</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Game Equipment</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Speaker</span>
                    <span className="text-sm font-medium">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Others</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Sales */}
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">Latest Sales</h2>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Products
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Customer
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Price
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Date
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Payment
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-500">
                      Status
                      <ChevronDown className="inline ml-1 w-4 h-4" />
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
                  ].map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt={item.product}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-xs text-blue-500">{item.id}</div>
                            <div className="text-sm">{item.product}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">duxdudu</td>
                      <td className="p-4 text-sm">{item.price}</td>
                      <td className="p-4 text-sm">04/17/23</td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.payment === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.payment}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "Shipping" ? "bg-purple-100 text-purple-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Most Sales Place */}
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">Most Sales Place</h2>
            <div className="bg-white p-4 rounded-lg border">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Musanze", percent: "22%", image: "/placeholder.svg?height=100&width=200" },
                  { name: "Kigali Vision City", percent: "13%", image: "/placeholder.svg?height=100&width=200" },
                  { name: "Gasabo", percent: "5.6%", image: "/placeholder.svg?height=100&width=200" },
                  { name: "Huye", percent: "20%", image: "/placeholder.svg?height=100&width=200" },
                ].map((place, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden h-24">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      width={200}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between p-4">
                      <span className="text-white font-medium">{place.name}</span>
                      <span className="text-white font-medium">{place.percent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}