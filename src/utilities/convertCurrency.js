export const convertCurrency = ({ value, selectedCurrency, toUSD = false }) => {
  const conversionRate = parseFloat(selectedCurrency) || 1;
  if (toUSD) return `${(value / conversionRate).toFixed(2)}`;
  else return `${(value * conversionRate).toFixed(2)}`;
};

export const convertToUSD = (revenueArray, conversionRateToUSD) => {
  if (revenueArray)
    return revenueArray.map((item) => {
      // Create a new object to hold converted values
      const convertedItem = { year: item.year };

      // Convert each quarter's revenue using the conversion rate
      convertedItem.Q1 = (parseFloat(item.Q1) / conversionRateToUSD).toFixed(2);
      convertedItem.Q2 = (parseFloat(item.Q2) / conversionRateToUSD).toFixed(2);
      convertedItem.Q3 = (parseFloat(item.Q3) / conversionRateToUSD).toFixed(2);
      convertedItem.Q4 = (parseFloat(item.Q4) / conversionRateToUSD).toFixed(2);

      return convertedItem;
    });
};
