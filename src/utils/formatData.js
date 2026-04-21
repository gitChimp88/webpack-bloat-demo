import { map, cloneDeep, round } from "lodash-es";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function formatData(chartData) {
  if (!chartData || !chartData.datasets) return null;

  return {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      // Pointlessly use lodash to clone and map
      data: map(cloneDeep(dataset.data), (v) => round(v * 1.0, 2)),
      label: `${dataset.label} (as of ${dayjs().format("MMM YYYY")})`,
    })),
  };
}
