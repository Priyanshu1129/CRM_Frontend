export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getColorForValue = (value) => {
  if (value > 80) return "#ff6b6b"; // Red for high values
  if (value > 50) return "#f0ad4e"; // Orange for medium values
  return "#8dc6ff"; // Blue for low values
};