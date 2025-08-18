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

  const totalWh = (CPUWh + RAMWh) * upTime;
  //Falta calculo con bateria bateria

  return (
    <>
      <div>{`Promedio CPU: ${CPUWh}`}</div>
      <div>{`Promedio RAM: ${RAMWh}`}</div>
      <div>{`Horas encendido: ${upTime}`}</div>
      <div>{`Total Wh: ${totalWh}`}</div>
    </>
  );
};
