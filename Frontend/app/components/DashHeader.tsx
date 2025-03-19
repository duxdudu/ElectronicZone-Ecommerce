"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ShoppingCart,
  MoreVertical,
  TrendingUp,
  Home,
  Package,
  FileText,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import RevenueChart from "./revenue-chart";
import DonutChart from "./donut-chart";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import DonutChart from "@/components/donut-chart"
// import RevenueChart from "@/components/revenue-chart"
interface ReusableParentProps {
  ComponentToRender: React.ComponentType;
}
export default function DashHeader({ ComponentToRender }: ReusableParentProps) {
  const [activeTab, setActiveTab] = useState("today");
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[220px] border-r flex flex-col">
        <div className="py-4">
          <div className="px-4 py-2 text-sm text-gray-500 font-medium">
            GENERAL
          </div>
          <div className="space-y-1">
            <Link href="/dashboard">
              <NavItem 
                icon={<Home size={18} />} 
                label="Dashboard" 
                active={pathname === "/dashboard"} 
              />
            </Link>

            <Link href="/dashboard/products">
              <NavItem
                icon={<Package size={18} />}
                label="Product (119)"
                active={pathname?.includes("/dashboard/products")}
              />
            </Link>

            <Link href="/dashboard/Transactions">
              <NavItem
                icon={<FileText size={18} />}
                label="Transaction (441)"
                active={pathname?.includes("/dashboard/Transactions")}
              />
            </Link>
            <Link href="/dashboard/Customer">
              <NavItem 
                icon={<Users size={18} />} 
                label="Customers" 
                active={pathname?.includes("/dashboard/Customer")}
              />
            </Link>
         
            <Link href="/dashboard/Sales">
            <NavItem icon={<BarChart2 size={18} />} label="Sales Report"
            active={pathname?.includes("/dashboard/Sales")}
            />
            </Link>
           
          </div>

          <div className="mt-6 px-4 py-2 text-sm text-gray-500 font-medium">
            TOOLS
          </div>
          <div className="space-y-1">
            <NavItem icon={<Settings size={18} />} label="Account & Settings" />
            <NavItem icon={<HelpCircle size={18} />} label="Help" />
          </div>
        </div>

        <div className="mt-auto p-4 border-t flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MacBook%20Pro%2016_%20-%209%20%281%29-iym7LyON9fAUtGm4QPh4nZyeGhJLn9.png"
              alt="User"
            />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Dux-dudu</div>
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2 mt-1 text-orange-500 border-orange-500"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ComponentToRender />
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  hasDropdown = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}) {
  return (
    <div
      className={`flex items-center px-4 py-2 text-sm ${
        active ? "bg-orange-50 text-orange-500 font-medium" : "text-gray-700"
      }`}
    >
      <div className="w-5 mr-3">{icon}</div>
      <span>{label}</span>
      {hasDropdown && (
        <svg
          className="ml-auto h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  chartData,
}: {
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
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                ></div>
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
  );
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
  );
}

function OrderRow({
  product,
  orderId,
  date,
  customer,
  status,
  amount,
}: {
  product: string;
  orderId: string;
  date: string;
  customer: string;
  status: "delivered" | "pending" | "canceled";
  amount: string;
}) {
  const getStatusColor = (status: any) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "pending":
        return "bg-orange-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-3">{product}</td>
      <td className="px-4 py-3">{orderId}</td>
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3">{customer}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${getStatusColor(status)}`}
          ></div>
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
  );
}
