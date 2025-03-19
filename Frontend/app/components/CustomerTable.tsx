import { Eye, Edit, Trash, ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function CustomerTable() {
  const customers = [
    {
      id: "ID12451",
      name: "Duxdudu",
      contact: "dudu@examp.com",
      phone: "+250786885185",
      purchases: "$221.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    {
      id: "ID12452",
      name: "Duxdudu",
      contact: "dudu@examp.com",
      phone: "+250786885185",
      purchases: "$21.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    {
      id: "ID12453",
      name: "dududux",
      contact: "dudu@examp.com",
      phone: "+250786885185",
      purchases: "$21.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    {
      id: "ID12453",
      name: "dududux",
      contact: "dudu@examp.com",
      phone: "+250786885185",
      purchases: "$21.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    {
      id: "ID12452",
      name: "dushi",
      contact: "dudu@examp.com",
      phone: "+250786885185",
      purchases: "$21.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    {
      id: "ID12451",
      name: "dududux",
      contact: "dudu@examp.com",
      phone: "+62 819 1314 1435",
      purchases: "$21.78",
      orderQty: "30 Order",
      address: "2972 kigali-Rwanda Nyarugenge",
    },
    
  ]

  return (
    <div className="bg-white rounded-lg border border-[#e7e7e7] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f6f6f6] border-b border-[#e7e7e7]">
              <th className="w-12 px-4 py-3">
                <Checkbox />
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Name Customer</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Contact</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Purchases</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Order QTY</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Address</th>
              <th className="px-4 py-3 text-left font-medium text-sm text-[#323130]">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index} className="border-b border-[#e7e7e7] hover:bg-[#f0f2f5]">
                <td className="px-4 py-3">
                  <Checkbox />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-xs text-[#1b59f8]">{customer.id}</div>
                    <div className="font-medium">{customer.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm">{customer.contact}</div>
                    <div className="text-xs text-[#727272]">{customer.phone}</div>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{customer.purchases}</td>
                <td className="px-4 py-3">{customer.orderQty}</td>
                <td className="px-4 py-3">{customer.address}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-[#727272] hover:text-[#1b59f8]">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-[#727272] hover:text-[#1b59f8]">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-[#727272] hover:text-[#e42313]">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between text-sm">
        <div className="text-[#727272]">1 - 10 of 13 Pages</div>
        <div className="flex items-center gap-2">
          <div className="text-[#727272]">The page on</div>
          <div className="flex items-center border border-[#e7e7e7] rounded">
            <button className="px-2 py-1 flex items-center">
              1 <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="flex">
            <button className="p-1 border border-[#e7e7e7] rounded-l">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1 border-t border-r border-b border-[#e7e7e7] rounded-r">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

