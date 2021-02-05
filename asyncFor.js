// synchronous
{
  const res = [];
  for (let i of [1, 2, 3]) {
    res.push(i + 1);
  }
  console.log(res);
  // res: [2, 3, 4]
}
const sleep = (n) => new Promise((res) => setTimeout(res, n));
// asynchronous
(async () => {
  const res = [];
  for (let i of [1, 2, 3]) {
    await sleep(10);
    res.push(i + 1);
  }
  console.log(res);
  // res: [2, 3, 4]
})();
