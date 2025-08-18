import { CoMetric } from "../../components/coMetric/CoMetric";
import type { Metric } from "../../services/MetricsService";

interface HeaderProps {
  metrics: Metric[];
}
export const Header = (props: HeaderProps) => {
  const { metrics } = props;
  return (
    <div className="bg-cyan-950 w-full rounded-xl h-fit mb-3 p-3">
      <CoMetric metrics={metrics} />
    </div>
  );
};
