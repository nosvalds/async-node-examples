const Promise = require("bluebird");
const sleep = (n) => new Promise((res) => setTimeout(res, n));

const arr = [30, 10, 20, 20, 15, 20, 10];

// Bluebird promise
(async () => {
  const res = await Promise.map(
    arr,
    async (v) => {
      console.log(`S ${v}`);
      await sleep(v);
      console.log(`F ${v}`);
      return v + 1;
    },
    { concurrency: 2 }
  );

  // S 30
  // S 10
  // F 10
  // S 10
  // F 30
  // S 20
  // F 10
  // S 15
  // F 20
  // S 20
  // F 15
  // S 20
  // F 20
  // F 20

  console.log(res);
  // 31,11,21,21,16,21,11
})();
