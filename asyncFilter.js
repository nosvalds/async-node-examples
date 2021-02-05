// synchronous
console.log(
  [1, 2, 3, 4, 5].filter((i) => {
    return i % 2 === 0;
  })
);
// [2, 4]

// asynchronous
console.log(
  [1, 2, 3, 4, 5].filter(async (i) => {
    return i % 2 === 0;
  })
);
// [1, 2, 3, 4, 5]
