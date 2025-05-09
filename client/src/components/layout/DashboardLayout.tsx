import { useState } from "react";
import { Link, useLocation } from "wouter";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { useSystemStatus } from "@/hooks/use-dashboard-data";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { status } = useSystemStatus();

  const navigationItems = [
    { href: "/", label: "Dashboard", icon: "ri-dashboard-line" },
    { href: "/incidents", label: "Incidents", icon: "ri-error-warning-line" },
    { href: "/logs", label: "Logs", icon: "ri-file-list-line" },
    { href: "/packet-management", label: "Packet Management", icon: "ri-send-plane-line" },
    { href: "/settings", label: "Settings", icon: "ri-settings-line" }
  ];

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const systemStatusLabel = status === "operational" 
    ? "System Online" 
    : status === "partial_outage" 
      ? "Partial Outage" 
      : "Major Outage";

  const systemStatusColor = status === "operational" 
    ? "success" 
    : status === "partial_outage" 
      ? "warning" 
      : "danger";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-slate-800 text-white w-full md:w-64 md:min-h-screen md:flex-shrink-0">
        <div className="p-4 flex items-center justify-between md:justify-start">
          <div className="flex items-center">
            <i className="ri-exchange-line text-2xl mr-2 text-primary"></i>
            <h1 className="text-xl font-semibold">Datareon</h1>
          </div>
          <button 
            onClick={toggleMobileSidebar}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>
        <nav className={cn("md:block", mobileSidebarOpen ? "block" : "hidden")}>
          <ul className="py-2">
            {navigationItems.map((item) => (
              <li 
                key={item.href}
                className={cn(
                  "px-4 py-2 hover:bg-slate-700", 
                  location === item.href && "bg-slate-700"
                )}
              >
                <Link href={item.href} className="flex items-center">
                  <i className={cn(item.icon, "mr-3")}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-700 hidden md:block">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white">
              <i className="ri-user-line"></i>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-400">System Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-slate-800">Bus Monitoring Dashboard</h2>
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8 pr-4 py-1 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              </div>
              <div className="flex items-center">
                <StatusIndicator status={systemStatusColor as any} />
                <span className="text-sm font-medium">{systemStatusLabel}</span>
              </div>
              <button className="p-1 rounded-full hover:bg-slate-100">
                <i className="ri-notification-3-line text-slate-600"></i>
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100">
                <i className="ri-settings-4-line text-slate-600"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
