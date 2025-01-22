function one(two) {
  let res = 5 + 7;
  two(res);
}

function two(res) {
  console.log(res);
}

one(two);
