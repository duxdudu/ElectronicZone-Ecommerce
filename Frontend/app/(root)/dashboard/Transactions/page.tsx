"use client";
import DashHeader from "@/app/components/DashHeader";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import MagicText from "@/app/components/Products";
import Transactions from "@/app/components/transactions";
import { defaultOverrides } from "next/dist/server/require-hook";

export default function page() {
  return (
    <div>
      <HeaderDashboard />
      <DashHeader ComponentToRender={Transactions} />
    </div>
  );
}
