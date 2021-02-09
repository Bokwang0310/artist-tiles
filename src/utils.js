const hasSameElements = (arr1, arr2) =>
  arr1.every((item) => arr2.includes(item));

export const isCached = (oldObj, newArr) => {
  if (!oldObj) {
    return false;
  }

  const oldArr = Object.keys(oldObj);

  if (oldArr.length !== newArr.length || !hasSameElements(oldArr, newArr)) {
    return false;
  }

  return true;
};

export const objToQueryString = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    ""
  );
