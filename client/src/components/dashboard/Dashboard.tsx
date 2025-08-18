import { useEffect, useState } from "react";
import { MetricService, type Metric } from "../../services/MetricsService";
import { ChartRamRom } from "./charts/ChartRamRom";
import { ChartUptimeHours } from "./charts/ChartUptimeHours";
import { ChartBatteryLevel } from "./charts/ChartBatteryLevel";
import { Header } from "../../common/header/Header";

const today = new Date().toISOString().split("T")[0];

export const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [batteryPercentage, setBatteryPercentage] = useState<number[]>([]);
  const [batteryIsActive, setBatteryIsActive] = useState<number[]>([]);

  useEffect(() => {
    getMetrics();
  }, []);

  const getMetrics = async () => {
    console.log("1");
    MetricService.getMetrics().then((data) => {
      setMetrics(
        data.filter((da) => {
          const dateStr = new Date(da.timestamp).toISOString().split("T")[0];
          return dateStr === today;
        })
      );
      console.log("2");
      const getBatteryPercentage = data
        .filter((da) => {
          const dateStr = new Date(da.timestamp).toISOString().split("T")[0];
          return dateStr === today;
        })
        .map((metric: Metric) => {
          return metric.battery_percent;
        });
      const getBatteryIsActive = data
        .filter((da) => {
          const dateStr = new Date(da.timestamp).toISOString().split("T")[0];
          return dateStr === today;
        })
        .map((metric: Metric) => {
          return metric.battery_plugged ? 1 : 0;
        });
      setBatteryPercentage(getBatteryPercentage);
      setBatteryIsActive(getBatteryIsActive);
    });
  };

  return (
    <div className="w-full h-screen bg-radial-[at_50%_75%] from-teal-400 to-teal-900 p-3 ">
      <Header metrics={metrics} />
      <div className="w-full flex flex-row flex-wrap gap-3">
        <div className="bg-cyan-950 w-full rounded-xl h-fit">
          <ChartBatteryLevel
            metrics={metrics}
            batteryPercentage={batteryPercentage}
            batteryIsActive={batteryIsActive}
          />
        </div>
        <div className="bg-cyan-950 w-[calc(50%-0.375rem)] rounded-xl h-fit">
          <ChartRamRom metrics={metrics} />
        </div>
        <div className="bg-cyan-950 w-[calc(50%-0.375rem)] rounded-xl h-fit">
          <ChartUptimeHours metrics={metrics} />
        </div>
      </div>
    </div>
  );
};
