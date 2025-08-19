import type { Metric } from "../../services/MetricsService";
import { getWhCPURAM } from "../../utils/Utils";

interface CoMetricProps {
  metrics: Metric[];
}

const cpuDefault = 10; // CPU: 20 W max
const ramDefault = 2;
export const CoMetric = (props: CoMetricProps) => {
  const { metrics } = props;
  const CPUWh = getWhCPURAM(
    metrics.map((metric) => metric.cpu_usage_percent),
    cpuDefault
  );
  const RAMWh = getWhCPURAM(
    metrics.map((metric) => metric.ram_usage_percent),
    ramDefault
  );
  const upTime = Math.max(...metrics.map((metric) => metric.uptime_hours));
  const upTimeToday = Math.max(
    ...metrics
      .filter((metric) => metric.inactive)
      .map((metric) => metric.uptime_hours)
  );
  const totalWh = (CPUWh + RAMWh) * (upTime - upTimeToday);

  return (
    <div className="flex gap-3">
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Promedio CPU: ${CPUWh.toFixed(
        2
      )}`}</div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Promedio RAM: ${RAMWh.toFixed(
        2
      )}`}</div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Horas encendido: ${upTime.toFixed(
        2
      )}`}</div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Horas encendido hoy: ${upTimeToday.toFixed(
        2
      )}`}</div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Total Wh: ${totalWh.toFixed(
        2
      )}`}</div>
    </div>
  );
};
