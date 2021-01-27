// TODO: use flat
export const spreadArrayOfKeys = (obj) => {
  const result = Object.entries(obj).reduce((prev, [key, valueList]) => {
    const spreaded = valueList.map((value) => {
      return { artist: key, name: value };
    });
    return [...prev, ...spreaded];
  }, []);

  return result;
};

export const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const getThumbnail = (videoId, size = "big") => {
  if (size === "small") {
    return `https://img.youtube.com/vi/${videoId}/2.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};

export const queryObjToString = (obj) => {
  const queryStr = Object.entries(obj).reduce((prev, [key, value]) => {
    return `${prev}&${key}=${value}`;
  }, "");

  return queryStr;
};
