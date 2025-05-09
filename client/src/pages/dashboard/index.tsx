import StatusOverview from "@/components/dashboard/StatusOverview";
import DataExchangeMonitor from "@/components/dashboard/DataExchangeMonitor";
import ActiveIncidents from "@/components/dashboard/ActiveIncidents";
import ServiceStatus from "@/components/dashboard/ServiceStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LogsSection from "@/components/dashboard/LogsSection";
import PacketResendTool from "@/components/dashboard/PacketResendTool";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Datareon Bus Monitoring</title>
        <meta name="description" content="Monitor data exchange via Datareon bus with real-time status tracking, incident logging, and performance metrics." />
      </Helmet>
      
      <StatusOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <DataExchangeMonitor />
          <ActiveIncidents />
        </div>
        
        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <ServiceStatus />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
      
      <LogsSection />
      <PacketResendTool />
    </>
  );
}
