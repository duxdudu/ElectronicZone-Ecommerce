"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 rounded-lg bg-blue-50 p-1 mb-6">
          <TabsTrigger
            value="account"
            className={`rounded-md py-3 ${activeTab === "account" ? "bg-white text-blue-500" : "text-gray-500"}`}
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className={`rounded-md py-3 ${activeTab === "security" ? "bg-white text-blue-500" : "text-gray-500"}`}
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notification"
            className={`rounded-md py-3 ${activeTab === "notification" ? "bg-white text-blue-500" : "text-gray-500"}`}
          >
            Notification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-6">Profile Information</h2>

            <div className="flex items-start gap-4 mb-8">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 h-9">
                <Pencil className="h-4 w-4" />
                Change Pictures
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <Input id="firstName" defaultValue="Duxforreally" className="bg-white" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <Input id="lastName" defaultValue="durant" className="bg-white" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input id="email" type="email" defaultValue="dudufredu@gmail.com" className="bg-white" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <Input id="gender" defaultValue="Male" className="bg-white" />
              </div>
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
                  Date Birthday
                </label>
                <Input id="birthday" defaultValue="23 Desember 2003" className="bg-white" />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
              <Button variant="link" className="text-gray-500">
                Cancel
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-700">Contact Detail</h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-3 rounded-full border">
                Edit <Pencil className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input id="phone" defaultValue="+250786885185" className="bg-gray-100" disabled />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <Input id="country" defaultValue="Rwanda" className="bg-gray-100" disabled />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input id="address" defaultValue="kigali-Rwanda" className="bg-gray-100" disabled />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium text-gray-700">Security Settings</h2>
            <p className="text-gray-500 mt-2">Manage your security preferences</p>
          </div>
        </TabsContent>

        <TabsContent value="notification">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-medium text-gray-700">Notification Settings</h2>
            <p className="text-gray-500 mt-2">Manage your notification preferences</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
