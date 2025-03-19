"use client"
import DashHeader from "@/app/components/DashHeader";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import DashProducts from "@/app/components/Products";
import SalesDash from "@/app/components/Sales";

export default function Sales() {
    return (
        <div>
            <HeaderDashboard />
            <DashHeader ComponentToRender={SalesDash} />
        </div>
    )
}