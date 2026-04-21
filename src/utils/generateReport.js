import { size, forEach, meanBy, filter } from "lodash-es";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

/**
 * Generates a "report" — an excuse to import extra moment locales
 * that will never be switched to at runtime.
 */
export function generateReport(users) {
  const lines = [];

  lines.push(`Report generated: ${dayjs().format("LLLL")}`);
  lines.push(`Total users: ${size(users)}`);

  forEach(users, (user) => {
    lines.push(
      `[${user.id}] ${user.name} — joined ${user.joined} — score: ${user.score}`,
    );
  });

  lines.push(`---`);
  lines.push(`Mean score: ${meanBy(users, "score").toFixed(2)}`);
  lines.push(`Active users: ${filter(users, "active").length}`);

  return lines;
}
