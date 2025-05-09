import { useState } from "react";
import { useRecentPackets, useResendPacket } from "@/hooks/use-incident-data";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PacketManagement() {
  const { data: recentPackets, isLoading: isLoadingPackets } = useRecentPackets();
  const resendPacketMutation = useResendPacket();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    packetId: "",
    service: "",
    priority: "normal",
    options: {
      forceResend: false,
      skipValidation: false,
      notifyOnCompletion: false
    }
  });
  
  const [showHistoryTab, setShowHistoryTab] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      priority: value
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.packetId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a packet ID or reference",
        variant: "destructive"
      });
      return;
    }

    if (!formData.service) {
      toast({
        title: "Validation Error",
        description: "Please select a target service",
        variant: "destructive"
      });
      return;
    }

    // Submit data
    resendPacketMutation.mutate({
      id: formData.packetId,
      service: formData.service,
      priority: formData.priority,
      options: formData.options
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Packet ${formData.packetId} resend request has been submitted`,
          variant: "default"
        });
        
        // Reset form
        setFormData({
          packetId: "",
          service: "",
          priority: "normal",
          options: {
            forceResend: false,
            skipValidation: false,
            notifyOnCompletion: false
          }
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to resend packet: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive"
        });
      }
    });
  };

  // Extended packet history for demonstration
  const extendedPacketHistory = [
    ...recentPackets || [],
    { id: "PKT-8290", timestamp: "Today, 09:45 AM", status: "success" },
    { id: "PKT-8289", timestamp: "Today, 09:32 AM", status: "success" },
    { id: "PKT-8288", timestamp: "Today, 09:17 AM", status: "failed" },
    { id: "PKT-8287", timestamp: "Today, 08:55 AM", status: "success" },
    { id: "PKT-8286", timestamp: "Today, 08:42 AM", status: "success" },
    { id: "PKT-8285", timestamp: "Today, 08:30 AM", status: "success" },
    { id: "PKT-8284", timestamp: "Today, 08:15 AM", status: "success" },
    { id: "PKT-8283", timestamp: "Yesterday, 18:42 PM", status: "failed" },
    { id: "PKT-8282", timestamp: "Yesterday, 17:30 PM", status: "success" },
    { id: "PKT-8281", timestamp: "Yesterday, 16:15 PM", status: "success" }
  ];

  return (
    <>
      <Helmet>
        <title>Packet Management | Datareon Bus Monitoring</title>
        <meta name="description" content="Manage and resend data packets, view packet history, and troubleshoot failed transmissions." />
      </Helmet>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex border-b border-slate-200 mb-4">
          <button 
            className={`px-4 py-2 font-medium text-sm ${!showHistoryTab ? 'text-primary border-b-2 border-primary' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setShowHistoryTab(false)}
          >
            Packet Resend
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${showHistoryTab ? 'text-primary border-b-2 border-primary' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setShowHistoryTab(true)}
          >
            Packet History
          </button>
        </div>
        
        {!showHistoryTab ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Resend Packet</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="packetId" className="block text-sm font-medium text-slate-700 mb-1">
                    Packet ID or Reference
                  </label>
                  <input 
                    type="text" 
                    id="packetId"
                    name="packetId"
                    value={formData.packetId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Enter packet ID or reference number"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">
                    Target Service
                  </label>
                  <select 
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="payment">Payment Service</option>
                    <option value="order">Order Service</option>
                    <option value="customer">Customer Service</option>
                    <option value="inventory">Inventory Service</option>
                    <option value="product">Product Service</option>
                    <option value="notification">Notification Service</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="priority" 
                        value="normal"
                        checked={formData.priority === "normal"}
                        onChange={handlePriorityChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">Normal</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="priority" 
                        value="high"
                        checked={formData.priority === "high"}
                        onChange={handlePriorityChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">High</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="priority" 
                        value="critical"
                        checked={formData.priority === "critical"}
                        onChange={handlePriorityChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">Critical</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Additional Options</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="forceResend"
                        checked={formData.options.forceResend}
                        onChange={handleOptionChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">Force resend</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="skipValidation"
                        checked={formData.options.skipValidation}
                        onChange={handleOptionChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">Skip validation</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="notifyOnCompletion"
                        checked={formData.options.notifyOnCompletion}
                        onChange={handleOptionChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-slate-700">Notify on completion</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button 
                    type="button"
                    className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                    onClick={() => setFormData({
                      packetId: "",
                      service: "",
                      priority: "normal",
                      options: {
                        forceResend: false,
                        skipValidation: false,
                        notifyOnCompletion: false
                      }
                    })}
                  >
                    Reset
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                    disabled={resendPacketMutation.isPending}
                  >
                    {resendPacketMutation.isPending ? "Processing..." : "Resend Packet"}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-md">
              <h4 className="font-medium text-slate-800 mb-3">Recent Resends</h4>
              {isLoadingPackets ? (
                <div className="space-y-3 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-2 border-l-2 border-slate-300 bg-white rounded">
                      <div className="h-5 w-24 bg-slate-200 rounded mb-1"></div>
                      <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPackets?.map((packet) => (
                    <div 
                      key={packet.id} 
                      className={`p-2 border-l-2 ${
                        packet.status === "success" ? "border-green-500" : 
                        packet.status === "failed" ? "border-red-500" : 
                        "border-amber-500"
                      } bg-white rounded`}
                    >
                      <p className="text-sm font-medium">{packet.id}</p>
                      <p className="text-xs text-slate-500">
                        {packet.timestamp} · {
                          packet.status === "success" ? "Success" : 
                          packet.status === "failed" ? "Failed" : 
                          "Pending"
                        }
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button 
                className="mt-3 text-primary text-sm font-medium flex items-center"
                onClick={() => setShowHistoryTab(true)}
              >
                View Full History <i className="ri-arrow-right-s-line ml-1"></i>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Packet History</h3>
              <div className="mt-2 md:mt-0 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search packets..."
                  className="px-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select className="px-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
                <button className="px-3 py-1 text-sm bg-primary text-white rounded-md">
                  Export
                </button>
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Packet ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingPackets ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell><div className="h-5 w-20 bg-slate-200 rounded"></div></TableCell>
                        <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                        <TableCell><div className="h-5 w-16 bg-slate-200 rounded"></div></TableCell>
                        <TableCell><div className="h-5 w-24 bg-slate-200 rounded"></div></TableCell>
                        <TableCell className="text-right"><div className="h-8 w-20 bg-slate-200 rounded ml-auto"></div></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    extendedPacketHistory.map((packet, index) => (
                      <TableRow key={packet.id}>
                        <TableCell className="font-medium">{packet.id}</TableCell>
                        <TableCell>{packet.timestamp}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              packet.status === "success" ? "success" :
                              packet.status === "failed" ? "destructive" :
                              "outline"
                            }
                          >
                            {packet.status === "success" ? "Success" :
                             packet.status === "failed" ? "Failed" :
                             "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{["Payment", "Order", "Customer", "Inventory"][index % 4]} Service</TableCell>
                        <TableCell className="text-right">
                          {packet.status === "failed" && (
                            <button 
                              className="px-2 py-1 text-xs bg-primary text-white rounded"
                              onClick={() => {
                                setShowHistoryTab(false);
                                setFormData(prev => ({
                                  ...prev,
                                  packetId: packet.id,
                                  service: ["payment", "order", "customer", "inventory"][index % 4]
                                }));
                              }}
                            >
                              Resend
                            </button>
                          )}
                          <button className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 ml-2">
                            Details
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              
              <div className="p-2 border-t border-slate-200 flex justify-between items-center">
                <div className="text-sm text-slate-500">
                  Showing {extendedPacketHistory.length} of {extendedPacketHistory.length} packets
                </div>
                <div className="flex gap-1">
                  <button className="px-2 py-1 text-sm rounded border border-slate-300 text-slate-600">
                    Previous
                  </button>
                  <button className="px-2 py-1 text-sm rounded border border-primary bg-primary text-white">
                    1
                  </button>
                  <button className="px-2 py-1 text-sm rounded border border-slate-300 text-slate-600">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
