// TODO: use flat
export const spreadArrayOfKeys = (obj) => {
  const result = Object.entries(obj).reduce((acc, [key, valueList]) => {
    const spreaded = valueList.map((value) => {
      return { artist: key, name: value };
    });
    return [...acc, ...spreaded];
  }, []);

  return result;
};

export const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const queryObjToString = (obj) => {
  const queryStr = Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc}&${key}=${value}`;
  }, "");

  return queryStr;
};

export const getOrder = async (path) => {
  return await fetch(path)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
