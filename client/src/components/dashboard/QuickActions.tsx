import { Link } from "wouter";

export default function QuickActions() {
  const actions = [
    { id: "resend", icon: "ri-restart-line", label: "Resend Packet", href: "/packet-management" },
    { id: "restart", icon: "ri-refresh-line", label: "Restart Service", href: "/settings" },
    { id: "export", icon: "ri-download-2-line", label: "Export Logs", href: "/logs" },
    { id: "diagnostics", icon: "ri-shield-check-line", label: "Run Diagnostics", href: "/settings" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link 
            key={action.id}
            href={action.href}
            className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            <i className={`${action.icon} text-xl text-primary mb-1`}></i>
            <span className="text-sm text-slate-700">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
