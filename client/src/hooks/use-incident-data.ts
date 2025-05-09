import { useQuery, useMutation } from "@tanstack/react-query";
import { Incident, LogEntry, Packet } from "@/lib/types";
import { incidents, logs, recentPackets } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export function useIncidents() {
  return useQuery<Incident[]>({
    queryKey: ["/api/incidents"],
    initialData: incidents
  });
}

export function useLogs() {
  return useQuery<LogEntry[]>({
    queryKey: ["/api/logs"],
    initialData: logs
  });
}

export function useFilteredLogs(level?: string, search?: string) {
  const { data = [], isLoading } = useLogs();
  
  const filteredLogs = data.filter(log => {
    const matchesLevel = !level || level === "all" || log.level === level.toLowerCase();
    const matchesSearch = !search || 
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.service.toLowerCase().includes(search.toLowerCase());
    
    return matchesLevel && matchesSearch;
  });
  
  return { data: filteredLogs, isLoading };
}

export function useRecentPackets() {
  return useQuery<Packet[]>({
    queryKey: ["/api/packets/recent"],
    initialData: recentPackets
  });
}

export function useResendPacket() {
  return useMutation({
    mutationFn: async (packetData: { 
      id?: string, 
      service: string, 
      priority: string,
      options: {
        forceResend: boolean,
        skipValidation: boolean,
        notifyOnCompletion: boolean
      }
    }) => {
      const response = await apiRequest("POST", "/api/packets/resend", packetData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packets/recent"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities/recent"] });
    }
  });
}
