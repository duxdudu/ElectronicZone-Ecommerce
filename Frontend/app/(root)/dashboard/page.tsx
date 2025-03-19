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
// import DashHeader from "../components/DashHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import RevenueChart from "@/app/components/revenue-chart";
import DonutChart from "@/app/components/donut-chart";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import DashHeader from "@/app/components/DashHeader";
import { NavItem } from "@/app/components/NavItem";
import MagicText from "@/app/components/Products";
import Dashboardcontent from "@/app/components/dashboardcontent";
// import RevenueChart from "./revenue-chart"
// import DonutChart from "./donut-chart"
// import DonutChart from "@/components/donut-chart"
// import RevenueChart from "@/components/revenue-chart"

export default function dashboard() {
  return (
    <div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderDashboard />

        <DashHeader ComponentToRender={Dashboardcontent} />
      </div>
    </div>
  );
}
