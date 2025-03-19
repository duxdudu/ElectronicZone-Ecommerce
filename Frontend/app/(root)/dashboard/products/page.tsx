"use client"
import DashHeader from "@/app/components/DashHeader";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import DashProducts from "@/app/components/Products";

export default function products(){
    return (
        <div>
            <HeaderDashboard />
            <DashHeader ComponentToRender={DashProducts} />
        </div>
    )
}