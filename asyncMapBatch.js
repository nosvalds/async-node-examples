const _ = require("underscore");
const sleep = (n) => new Promise((res) => setTimeout(res, n));

// batch processing
//      The easiest way is to group elements and process the groups one by one.
//      This gives you control of the maximum amount of parallel tasks that can run at once.
//      But since one group has to finish before the next one starts,
//      the slowest element in each group becomes the limiting factor.

const arr = [30, 10, 20, 20, 15, 20, 10];

console.log(_.groupBy(arr, (_v, i) => Math.floor(i / 3)));
// {
// 	0: [30, 10, 20],
// 	1: [20, 15, 20],
// 	2: [10]
// }

const mapInGroups = (arr, iteratee, groupSize) => {
  const groups = _.groupBy(arr, (_v, i) => Math.floor(i / groupSize));

  return Object.values(groups).reduce(
    async (memo, group) => [
      ...(await memo),
      ...(await Promise.all(group.map(iteratee))),
    ],
    []
  );
};

(async () => {
  const res = await mapInGroups(
    arr,
    async (v) => {
      console.log(`S ${v}`);
      await sleep(v);
      console.log(`F ${v}`);
      return v + 1;
    },
    3
  );
  // -- first batch --
  // S 30
  // S 10
  // S 20
  // F 10
  // F 20
  // F 30
  // -- second batch --
  // S 20
  // S 15
  // S 20
  // F 15
  // F 20
  // F 20
  // -- third batch --
  // S 10
  // F 10

  console.log(res);
  // 31,11,21,21,16,21,11
})();
