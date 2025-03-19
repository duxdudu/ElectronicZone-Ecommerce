import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreVertical, TrendingUp } from "lucide-react";
import RevenueChart from "./revenue-chart";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import DonutChart from "./donut-chart";
export default function Dashboardcontent(){
    return(
        <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <Tabs defaultValue="today" className="w-[400px]">
            <TabsList className="grid grid-cols-4 h-10 rounded-full">
              <TabsTrigger value="today" className="rounded-full">
                Today
              </TabsTrigger>
              <TabsTrigger value="yesterday" className="rounded-full">
                Yesterday
              </TabsTrigger>
              <TabsTrigger value="week" className="rounded-full">
                Week
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-full">
                Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-5 gap-6 mb-2">
          <MetricCard
            title="Customers"
            value="4,209"
            chartData={[
              { name: "New", value: 62, color: "#FF5733" },
              { name: "Returning", value: 13, color: "#4285F4" },
              { name: "Inactive", value: 25, color: "#DADCE0" },
            ]}
          />

          <MetricCard
            title="Orders"
            value="1,302"
            chartData={[
              { name: "Pre Paid", value: 40, color: "#FF9933" },
              { name: "Post Paid", value: 60, color: "#E8EAED" },
            ]}
          />

          <MetricCard
            title="Revenue"
            value="1,402"
            chartData={[
              { name: "Pre Paid", value: 70, color: "#FF5733" },
              { name: "Post Paid", value: 30, color: "#E8EAED" },
            ]}
          />

          <MetricCard
            title="Delivery"
            value="1,122"
            chartData={[
              { name: "Pre Paid", value: 40, color: "#FF9933" },
              { name: "Post Paid", value: 60, color: "#E8EAED" },
            ]}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Revenue Chart */}
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
              <RevenueChart />
            </CardContent>
          </Card>

          {/* Most Sold Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Most Sold Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProductProgress name="Laptop & Computer" value={70} />
              <ProductProgress name="TV & Monitor" value={40} />
              <ProductProgress name="Game Equipment" value={60} />
              <ProductProgress name="Speaker" value={80} />
              <ProductProgress name="Others" value={20} />
            </CardContent>
          </Card>
        </div>

        {/* Total Cart Card */}
        <div className="absolute right-12 top-[280px] shadow-lg rounded-lg bg-white p-4 w-[200px]">
          <div className="text-center">
            <div className="text-gray-600 mb-1">Total Cart</div>
            <div className="text-2xl font-bold">120</div>
          </div>
        </div>

        {/* Latest Orders */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base font-medium">Latest Orders</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Products</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Customer name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                <OrderRow
                  product="Iphone 13 Pro"
                  orderId="#11232"
                  date="Jun 29,2022"
                  customer="Afaq Karim"
                  status="delivered"
                  amount="$400.00"
                />
                <OrderRow
                  product="Mackbook Pro"
                  orderId="#11232"
                  date="Jun 29,2022"
                  customer="Afaq Karim"
                  status="pending"
                  amount="$288.00"
                />
                <OrderRow
                  product="Apple Watch"
                  orderId="#11232"
                  date="Jun 29,2022"
                  customer="Afaq Karim"
                  status="canceled"
                  amount="$500.00"
                />
                <OrderRow
                  product="Microsoft Book"
                  orderId="#11232"
                  date="Jun 29,2022"
                  customer="Afaq Karim"
                  status="delivered"
                  amount="$100.00"
                />
                <OrderRow
                  product="Apple Pen"
                  orderId="#11232"
                  date="Jun 29,2022"
                  customer="Afaq Karim"
                  status="delivered"
                  amount="$60.00"
                />
              </tbody>
            </table>
          </div>
        </Card>
      </div>   
    )
}
function NavItem({ 
    icon, 
    label, 
    active = false, 
    hasDropdown = false 
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    hasDropdown?: boolean;
  }) {
    return (
      <div
        className={`flex items-center px-4 py-2 text-sm ${active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"}`}
      >
        <div className="w-5 mr-3">{icon}</div>
        <span>{label}</span>
        {hasDropdown && (
          <svg className="ml-auto h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    )
  }
  
  function MetricCard({ title, value, chartData }: { 
    title: string;
    value: string;
    chartData: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  }) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold mb-4">{value}</div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <div className="text-gray-600">
                    {item.value}% {item.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-24 w-24">
              <DonutChart data={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  function ProductProgress({ name, value }: { name: string; value: number }) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span>{name}</span>
          <span className="font-medium">{value}%</span>
        </div>
        <Progress value={value} className="h-2 [&>div]:bg-blue-600" />
      </div>
    )
  }
  
  function OrderRow({ 
    product, 
    orderId, 
    date, 
    customer, 
    status, 
    amount 
  }: {
    product: string;
    orderId: string;
    date: string;
    customer: string;
    status: 'delivered' | 'pending' | 'canceled';
    amount: string;
  }) {
    const getStatusColor = (status:any) => {
      switch (status) {
        case "delivered":
          return "bg-green-500"
        case "pending":
          return "bg-orange-500"
        case "canceled":
          return "bg-red-500"
        default:
          return "bg-gray-500"
      }
    }
  
    return (
      <tr className="border-b">
        <td className="px-4 py-3">{product}</td>
        <td className="px-4 py-3">{orderId}</td>
        <td className="px-4 py-3">{date}</td>
        <td className="px-4 py-3">{customer}</td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${getStatusColor(status)}`}></div>
            <span className="capitalize">{status}</span>
          </div>
        </td>
        <td className="px-4 py-3">{amount}</td>
        <td className="px-4 py-3">
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </td>
      </tr>
    )
  }
  