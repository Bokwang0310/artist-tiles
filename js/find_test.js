const obj = {
  BENEE: ["Supalonely", "Glitter"],
  "Ariana Grande": ["Positions"],
  "Jack Stauber": ["Dead Weight"],
  "Easy Life": ["Pockets", "Peanut Butter"],
};

const target = "Supalonely";
let correctArray = null;

console.log(target);
console.log("\n");

const vals = Object.values(obj);

let i = 0;
for (const ele of vals) {
  if (ele.includes(target)) {
    correctArray = vals[i];
    console.log("e!");
    break;
  }
  i++;
}

console.log(correctArray);

console.log(["Supalonely", "Glitter"].includes("Supalonely"));
