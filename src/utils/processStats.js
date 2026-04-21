// Another full lodash import
import _ from "lodash";

/**
 * Computes summary statistics — uses lodash for operations that
 * are trivially available in plain JS.
 */
export function processStats(users) {
  return {
    total: _.size(users),
    active: _.countBy(users, "active").true || 0,
    inactive: _.countBy(users, "active").false || 0,
    maxScore: _.maxBy(users, "score")?.score,
    minScore: _.minBy(users, "score")?.score,
    meanScore: _.meanBy(users, "score"),
    grouped: _.groupBy(users, (u) => (u.score >= 50 ? "high" : "low")),
    sorted: _.orderBy(users, ["score"], ["desc"]),
    top5: _.take(_.orderBy(users, ["score"], ["desc"]), 5),
    names: _.map(users, "name"),
    uniqueNames: _.uniq(_.map(users, "name")),
    scoreChunks: _.chunk(_.map(users, "score"), 5),
  };
}
