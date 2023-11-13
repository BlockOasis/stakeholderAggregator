function convertToCsv(dataObject) {
  const dataArray = Object.values(dataObject);
  return dataArray.join(",") + "\n";
}

module.exports = {
  convertToCsv,
};
