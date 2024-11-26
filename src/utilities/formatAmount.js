export function formatAmount(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Billions
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Millions
  } else if (num >= 100_000) {
    return (num / 100_000).toFixed(1).replace(/\.0$/, '') + 'L'; // Lakhs
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
  } else {
    return num.toString(); // Less than 1000, return as is
  }
}

