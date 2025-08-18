import type { Metric } from "../../../services/MetricsService";
import { LineAreaChart } from "../../../common/charts/LineAreaChart";

interface ChartUptimeHoursProps {
  metrics: Metric[];
}

export const ChartUptimeHours = (props: ChartUptimeHoursProps) => {
  const { metrics } = props;
  const dataX = metrics.map((metric: Metric) => {
    return new Date(metric.timestamp).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const dataY1 = metrics.map((metric: Metric) => {
    return metric.uptime_hours;
  });
  return (
    <LineAreaChart
      dataX={dataX}
      dataY1={dataY1}
      labelY1={"horas de actividad"}
    />
  );
};
