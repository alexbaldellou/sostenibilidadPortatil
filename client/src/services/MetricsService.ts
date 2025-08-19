import axios from "axios";

export interface Metric {
  timestamp: string;
  uptime_hours: number;
  cpu_usage_percent: number;
  ram_usage_percent: number;
  battery_percent: number;
  battery_plugged: boolean;
  inactive: boolean;
}

const API_URL = "http://localhost:3001/api/metrics";

export const MetricService = {
  async getMetrics(): Promise<Metric[]> {
    try {
      const response = await axios.get<Metric[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener métricas:", error);
      return [];
    }
  },
};
