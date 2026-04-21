// Yet another full moment + lodash import
import _ from "lodash";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/de";
import "moment/locale/es";
import "moment/locale/ja";
import "moment/locale/zh-cn";

/**
 * Generates a "report" — an excuse to import extra moment locales
 * that will never be switched to at runtime.
 */
export function generateReport(users) {
  const lines = [];

  lines.push(`Report generated: ${moment().format("LLLL")}`);
  lines.push(`Total users: ${_.size(users)}`);

  _.forEach(users, (user) => {
    lines.push(
      `[${user.id}] ${user.name} — joined ${user.joined} — score: ${user.score}`,
    );
  });

  lines.push(`---`);
  lines.push(`Mean score: ${_.meanBy(users, "score").toFixed(2)}`);
  lines.push(`Active users: ${_.filter(users, "active").length}`);
  lines.push(`French timestamp: ${moment().locale("fr").format("LLLL")}`);
  lines.push(`German timestamp: ${moment().locale("de").format("LLLL")}`);

  return lines;
}
