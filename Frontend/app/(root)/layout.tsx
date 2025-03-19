"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/Footer";
// import Header from "../components/header";
import DashHeader from "../components/DashHeader";
import Sidebar from "../components/Sidebar";
import HeaderDashboard from "../components/HeaderDashboard";
import Header from "../components/header";
import { ThemeProvider } from "@/app/context/ThemeContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[2000px] mx-auto px-4">
        {pathname?.includes("/dashboard") ? (
          <div className="flex flex-col space-y-4">
            {/* <HeaderDashboard />
            <DashHeader /> */}
            <main className="flex-1 py-6">{children}</main>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-8">{children}</main>
            <Footer />
          </div>
        )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default layout;
