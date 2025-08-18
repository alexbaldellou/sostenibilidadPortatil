import { LineAreaChart } from "../../../common/charts/LineAreaChart";
import type { Metric } from "../../../services/MetricsService";

interface ChartRamRomProps {
  metrics: Metric[];
}
export const ChartRamRom = (props: ChartRamRomProps) => {
  const { metrics } = props;
  const dataX = metrics.map((metric: Metric) => {
    return new Date(metric.timestamp).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const dataY1 = metrics.map((metric: Metric) => {
    return metric.cpu_usage_percent;
  });
  const dataY2 = metrics.map((metric: Metric) => {
    return metric.ram_usage_percent;
  });

  return (
    <LineAreaChart
      dataX={dataX}
      dataY1={dataY1}
      dataY2={dataY2}
      labelY1="CPU %"
      labelY2="RAM %"
    />
  );
};
