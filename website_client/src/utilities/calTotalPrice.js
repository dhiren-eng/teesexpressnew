const calTotalPrice = (cart) => {
  var totalPriceInfo = [0, 0];
  cart.forEach((element) => {
    totalPriceInfo[0] += element.totalPriceInfo[0];
    totalPriceInfo[1] += element.totalPriceInfo[1];
  });
  return totalPriceInfo;
};

export default calTotalPrice;
