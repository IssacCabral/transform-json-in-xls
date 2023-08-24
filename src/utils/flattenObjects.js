function flattenObjects(arr) {
  const formattedArr = [];

  arr.forEach((item) => {
    const flattenedItem = {};

    function flatten(obj, prefix = "") {
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Se o valor for um objeto, chama recursivamente flatten
          flatten(obj[key], prefix + key + "_");
        } else {
          // Se o valor não for um objeto, adiciona ao objeto flattenedItem
          flattenedItem[prefix + key] = obj[key];
        }
      }
    }

    flatten(item);
    formattedArr.push(flattenedItem);
  });

  return formattedArr;
}
