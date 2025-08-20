import { useEffect, useState } from "react";
import type { Metric } from "../../services/MetricsService";
import { getHoursToHMS, getWhCPURAM } from "../../utils/Utils";

interface CoMetricProps {
  metrics: Metric[];
}

const cpuDefault = 10; // CPU: 20 W max
const ramDefault = 2;
const getLastUpTime = (metricsList: Metric[]) => {
  return metricsList.at(-1);
};

export const CoMetric = (props: CoMetricProps) => {
  const { metrics } = props;
  const [totalWh, setTotalWh] = useState(0);
  const [upTime, setUpTime] = useState<number>(0);
  const [upTimeInactive, setUpTimeInactive] = useState<number>(0);

  const CPUWh = getWhCPURAM(
    metrics.map((metric) => metric.cpu_usage_percent),
    cpuDefault
  );
  const RAMWh = getWhCPURAM(
    metrics.map((metric) => metric.ram_usage_percent),
    ramDefault
  );

  useEffect(() => {
    if (metrics.length > 0) {
      const last = getLastUpTime(metrics);
      setUpTime(last ? last.uptime_hours : 0);

      const timeInactive = metrics.map(
        (metric) => metric.uptimme_inactive_hours
      );
      if (timeInactive.length > 0) {
        setUpTimeInactive(Math.max(...timeInactive));
      }
    }
  }, [metrics]);

  useEffect(() => {
    if (upTime && upTimeInactive && CPUWh && RAMWh) {
      setTotalWh((CPUWh + RAMWh) * (upTime - upTimeInactive));
    }
  }, [upTime, upTimeInactive, CPUWh, RAMWh]);

  return (
    <div className="flex gap-3">
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">
        {`Promedio CPU: ${CPUWh.toFixed(2)}`}%
      </div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">
        {`Promedio RAM: ${RAMWh.toFixed(2)}`}%
      </div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Horas encendido: ${getHoursToHMS(
        upTime - upTimeInactive
      )}`}</div>
      <div className="bg-indigo-500/80 text-white font-bold p-1 px-3 rounded-xl">{`Total Wh: ${totalWh.toFixed(
        2
      )}`}</div>
    </div>
  );
};
