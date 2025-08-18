import type { Metric } from "../../../services/MetricsService";
import { useEffect, useState } from "react";
import { LinesChart } from "../../../common/charts/LineChart";

interface ChartBatteryLevelProps {
  metrics: Metric[];
  batteryIsActive: number[];
  batteryPercentage: number[];
}

export const ChartBatteryLevel = (props: ChartBatteryLevelProps) => {
  const { metrics, batteryPercentage, batteryIsActive } = props;
  //   const [running, setRunning] = useState(false);

  const dataX = metrics.map((metric: Metric) => {
    return new Date(metric.timestamp).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const [firstData, setFirstData] = useState<number[]>([]);
  const [secondData, setSecondData] = useState<number[]>([]);

  useEffect(() => {
    if (batteryPercentage) setFirstData(batteryPercentage);
  }, [batteryPercentage]);

  useEffect(() => {
    if (batteryIsActive) setSecondData(batteryIsActive);
  }, [batteryIsActive]);

  //   useEffect(() => {
  //     if (!running) {
  //       return undefined;
  //     }
  //     const intervalId = setInterval(() => {
  //       setFirstData((prev) => [...prev.slice(1), prev.at(-1)!]);
  //       setSecondData((prev) => [...prev.slice(1), prev.at(-1)!]);
  //     }, 100);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [running]);

  return (
    <>
      <LinesChart
        dataY1={firstData}
        dataY2={secondData}
        dataX={dataX}
        labelY1="Batería %"
      />
      {/* <button onClick={() => setRunning(!running)}>
        {running ? "Parar" : "Empezar"}
      </button> */}
    </>
  );
};
