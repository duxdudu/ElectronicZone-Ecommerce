"use client"
import AddProductComponent from "@/app/components/Addproduct";
import DashHeader from "@/app/components/DashHeader";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image } from "lucide-react";
// import Image from "next/image";
// import AddProductComponent from "@/app/components/Addproduct";
export default function AddProduct(){
    return(
        <div>
          <HeaderDashboard />
          <DashHeader ComponentToRender={AddProductComponent} />  
        </div>
    )
}