// utility function for sleeping
const sleep = (n) => new Promise((res) => setTimeout(res, n));
const sleepSync = (n) => setTimeout(() => console.log("I'm sleeping: " + n), n);

// synchronous
const arr = [1, 2, 3];

const syncRes = arr.map((i) => {
  return i + 1;
});

console.log(syncRes);
// 2,3,4

// asynchronous
console.log(
  [1, 2, 3].map(async (i) => {
    return i + 1;
  })
);
// [object Promise],[object Promise],[object Promise]

// async with awaiting the promise
//   runs iteratee function in parallel for each element of the array, which can cause memory problems
//   memory problems can happen when the async function hits an API or consumes too much RAM that it’s not feasible to run too many at once.
(async () => {
  const startTime = new Date().getTime();
  const asyncRes = await Promise.all(
    arr.map(async (i) => {
      await sleep(10);
      return i + 1;
    })
  );

  console.log(asyncRes);
  // 2,3,4

  console.log(`Took ${new Date().getTime() - startTime} ms`);
  // Took 12ms
})();

// adding a sync function in the map (no issues)
(async () => {
  const startTime = new Date().getTime();
  const asyncRes = await Promise.all(
    arr.map(async (i) => {
      sleepSync(15);
      await sleep(10);
      return i + 1;
    })
  );

  console.log(asyncRes);
  // 3,4,5

  console.log(`Took ${new Date().getTime() - startTime} ms`);
  // Took 13ms
})();
