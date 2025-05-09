import { useState } from "react";
import { useRecentPackets, useResendPacket } from "@/hooks/use-incident-data";
import { useToast } from "@/hooks/use-toast";

export default function PacketResendTool() {
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

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-slate-800 mb-4">Packet Resend Tool</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
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
            
            <div className="mt-6 flex justify-end space-x-3">
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
                Cancel
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
          <button className="mt-3 text-primary text-sm font-medium flex items-center">
            View History <i className="ri-arrow-right-s-line ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
