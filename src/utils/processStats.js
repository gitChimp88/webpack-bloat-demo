import { size, countBy, maxBy, minBy, meanBy, groupBy, orderBy, take, map, uniq, chunk } from "lodash-es";

/**
 * Computes summary statistics — uses lodash for operations that
 * are trivially available in plain JS.
 */
export function processStats(users) {
  return {
    total: size(users),
    active: countBy(users, "active").true || 0,
    inactive: countBy(users, "active").false || 0,
    maxScore: maxBy(users, "score")?.score,
    minScore: minBy(users, "score")?.score,
    meanScore: meanBy(users, "score"),
    grouped: groupBy(users, (u) => (u.score >= 50 ? "high" : "low")),
    sorted: orderBy(users, ["score"], ["desc"]),
    top5: take(orderBy(users, ["score"], ["desc"]), 5),
    names: map(users, "name"),
    uniqueNames: uniq(map(users, "name")),
    scoreChunks: chunk(map(users, "score"), 5),
  };
}
