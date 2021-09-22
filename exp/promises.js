const promise1 = new Promise((res, rej) => {
  setTimeout(() => {
    Math.random() > 0.5 ? res("foo") : rej("bar");
  }, 300);
});

promise1
  .then((value) => {
    console.log(value);
    // expected output: "foo"
  })
  .catch((value) => {
    console.log(value);
  });

promise1
  .then((value) => {
    console.log(value);
    // expected output: "foo"
  })
  .catch((value) => {
    console.log(value);
  });

console.log(promise1);
// expected output: [object Promise]
