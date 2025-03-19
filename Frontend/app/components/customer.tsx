"use client";

// import { useState } from "react"
// import { Sidebar } from "@/components/sidebar"
// import { Header } from "@/components/header"
// import { CustomerTable } from "@/components/customer-table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus } from "lucide-react";
import { useState } from "react";
import { CustomerTable } from "./CustomerTable";
import { CustomerFormDialog } from "./CustomerFormDialog";
export default function CustomerDash() {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <div className=" h-screen bg-[#fafafa]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto ">
          <div className=" m-8">
            <div className="flex justify-end mb-6">
              <div className="flex space-x-1 bg-[#bcccf3] rounded-full p-1">
                {["Today", "Yesterday", "Week", "Month"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm rounded-full ${
                      activeTab === tab
                        ? "bg-[#1b59f8] text-white"
                        : "text-[#727272]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[#151718]">
                Customer
              </h1>
              <div className="flex items-center text-sm text-[#727272] mt-1">
                <span>Dashboard</span>
                <span className="mx-2">›</span>
                <span className="text-[#1b59f8]">Customer</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#727272] h-4 w-4" />
                <Input
                  placeholder="Search for id, name Customer"
                  className="pl-10 pr-4 py-2 border border-[#e7e7e7] rounded-lg"
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="border-[#e7e7e7] text-[#323130] flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  className="border-[#e7e7e7] text-[#323130] flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <CustomerFormDialog />
              </div>
            </div>

            <CustomerTable />
          </div>
        </main>
      </div>
    </div>
  );
}
