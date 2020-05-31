const stringToArray = (string) => {
  const splitString = string.split(',');
  const result = [];
  splitString.forEach((element) => result.push(element.trim()));
  return result;
};

export default stringToArray;
