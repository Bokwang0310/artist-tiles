const log = (msg) => console.log(msg, "\n");

const arr = [
  {
    name: "BENEE",
    musics: ["Find An Island"],
  },
  {
    name: "Ariana Grande",
    musics: ["Positions"],
  },
  {
    name: "Almost Monday",
    musics: ["Broken People"],
  },
  {
    name: "Easy Life",
    musics: ["Pockets", "Nightmares"],
  },
  {
    name: "Heyden",
    musics: ["You Got Me"],
  },
];

const r = arr.reduce((acc, { name, musics }) => {
  const musicsOfCurrArtist = musics.map((e) => {
    return { artist: name, music: e };
  });
  return [...acc, ...musicsOfCurrArtist];
}, []);
// log(r);

a = arr.map((o, i, own) => {
  return { artist: own[i].name, music: o.musics };
});
// log(a);

b = arr.reduce(
  (acc, curr, i, own) => [...acc, { artist: own[i].name, music: curr.musics }],
  []
);
// log(b);

const c = arr.flatMap((o) => o.musics);
log(c);

d = c.map((e) => {
  return { artist: "temp", music: e };
});
log(d);
