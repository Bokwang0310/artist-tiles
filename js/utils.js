// TODO: use flat
export const spreadArrayOfKeys = (obj) => {
  return Object.entries(obj).reduce((acc, [key, valueList]) => {
    const spreaded = valueList.map((value) => {
      return { artist: key, name: value };
    });
    return [...acc, ...spreaded];
  }, []);

  // entries.map((ele) => {
  //   f = ele.flat();
  //   [a, ...r] = f;
  //   return [...r].map((e) => {
  //     return { [a]: e };
  //   });
  // });
};

export const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const queryObjToString = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}&${key}=${value}`;
  }, "");
};

export const getOrder = async (path) => {
  return await fetch(path)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const hasSameElements = (arr1, arr2) => {
  return arr1.every((item) => {
    return arr2.includes(item);
  });
};
