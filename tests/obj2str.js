const obj = {
  part: "snippet",
  maxResults: "1",
  q: "Easy Life",
  type: "channel",
};

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

const result = Object.entries(obj).reduce((prev, [key, value]) => {
  return `${prev}&${key}=${value}`;
}, "");

console.log(result);
