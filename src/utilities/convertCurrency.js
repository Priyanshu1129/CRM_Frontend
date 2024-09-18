export const convertCurrency = (value, selectedCurrency, currencies) => {
    const currency = currencies.find(c => c.value === selectedCurrency);
    const conversionRate = currency ? parseFloat(currency.value) : 1;
    return value ? `${(value * conversionRate).toFixed(2)}` : 'N/A';
};