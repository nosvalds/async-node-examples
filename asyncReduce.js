// sync reduce
const arr = [1, 2, 3];

const syncRes = arr.reduce((memo, e) => {
  return memo + e;
}, 0);

console.log(syncRes);
// 6

// memo  	      e      	  result
// 0 (initial)	  1	          1
// 1	          2           3
// 3	          3	          (end result) 6

// async reduce

// utility function for sleeping
const sleep = (n) => new Promise((res) => setTimeout(res, n));

(async () => {
  const asyncRes = arr.reduce(async (memo, e) => {
    await sleep(10);
    return memo + e;
  }, 0);

  console.log(asyncRes);
  // Promise { <pending> }
})();

(async () => {
  const asyncRes = await arr.reduce(async (memo, e) => {
    await sleep(10);
    return memo + e;
  }, 0);

  console.log(asyncRes);
  // [object Promise]3
})();

// An async version is almost the same, but it returns a Promise on each iteration, so memo will be the Promise of the previous result.
// The iteratee function needs to await it in order to calculate the next result:

// Await memo last, runs the "sleep()" function in "parallel" only waiting for memo at the return
(async () => {
  const startTime = new Date().getTime();

  const asyncRes = await arr.reduce(async (memo, e) => {
    await sleep(10);
    return (await memo) + e;
  }, 0);

  console.log(asyncRes);
  // 6

  console.log(`Took ${new Date().getTime() - startTime} ms`);
  // Took 11-13 ms
})();

// Await memo first, runs the "sleep()" function in "series", waits for memo to return promise before running sleep.
// This can be useful if "sleep()" is a function that takes a LOT of memory and running in parallel breaks things
(async () => {
  const startTime = new Date().getTime();

  const asyncRes = await arr.reduce(async (memo, e) => {
    await memo;
    await sleep(10);
    return (await memo) + e;
  }, 0);

  console.log(asyncRes);
  // 6

  console.log(`Took ${new Date().getTime() - startTime} ms`);
  // Took 11-13 ms
})();
