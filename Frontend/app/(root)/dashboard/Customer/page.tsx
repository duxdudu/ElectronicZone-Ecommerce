import CustomerDash from "@/app/components/customer";
import DashHeader from "@/app/components/DashHeader";
import HeaderDashboard from "@/app/components/HeaderDashboard";

export default function Customer(){
    return(
        <div>
            <HeaderDashboard />
            <DashHeader ComponentToRender={CustomerDash} />
        </div>
    )
}