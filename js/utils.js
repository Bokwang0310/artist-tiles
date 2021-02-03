export const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const objToQueryString = (obj) => {
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
