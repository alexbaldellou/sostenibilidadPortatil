import { LineChart, lineElementClasses } from "@mui/x-charts";

interface LineChartProps {
  dataY1: number[];
  dataY2?: number[];
  dataX: string[];
  labelY1: string;
  labelY2?: string;
}
export const LinesChart = (props: LineChartProps) => {
  const { dataY1, dataY2, dataX, labelY1, labelY2 } = props;
  const margin = { right: 24 };
  const series = dataY2
    ? [
        {
          data: dataY1,
          label: labelY1,
          area: true,
          showMark: false,
          color: "rgba(7, 171, 138, 0.8)",
        },
        {
          data: dataY2,
          label: labelY2,
          area: true,
          showMark: false,
          color: "rgba(138, 7, 171, 0.5)",
        },
      ]
    : [
        {
          data: dataY1,
          label: labelY1,
          area: true,
          showMark: false,
          color: "rgba(7, 171, 138, 0.8)",
        },
      ];
  return (
    <>
      <LineChart
        height={300}
        skipAnimation
        series={series}
        xAxis={[
          {
            scaleType: "point",
            data: dataX,
          },
        ]}
        yAxis={[
          { id: "leftAxisId", width: 50 },
          { id: "rightAxisId", position: "right" },
        ]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
          "& .MuiChartsLegend-label": {
            color: "rgba(7, 171, 138, 0.8) !important",
            fontSize: 14,
          },
          "& .MuiChartsAxis-tickLabel": {
            fill: "rgba(7, 171, 138, 0.8) !important",
            fontSize: 14,
          },
          "& .MuiChartsAxis-line": {
            stroke: "rgba(7, 171, 138, 0.8) !important",
            strokeWidth: 2,
          },
          "& .MuiChartsGrid-line": {
            stroke: "rgba(7, 171, 138, 0.8) !important",
            strokeDasharray: "4 4",
          },
        }}
        margin={margin}
      />
    </>
  );
};
