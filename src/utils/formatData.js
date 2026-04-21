import { map, cloneDeep, round } from "lodash-es";
import moment from "moment";

/**
 * Formats chart data — an excuse to pull in lodash + moment a second time.
 */
export function formatData(chartData) {
  if (!chartData || !chartData.datasets) return null;

  return {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      // Pointlessly use lodash to clone and map
      data: map(cloneDeep(dataset.data), (v) => round(v * 1.0, 2)),
      label: `${dataset.label} (as of ${moment().format("MMM YYYY")})`,
    })),
  };
}
