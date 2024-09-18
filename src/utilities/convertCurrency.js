export const convertCurrency = (value, selectedCurrency) => {
    const conversionRate = parseFloat(selectedCurrency) || 1;
    return `${(value * conversionRate).toFixed(2)}`;
};