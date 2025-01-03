const getCookie = (name) => {
  console.log("document.cookie content:", document.cookie);
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  console.log("match", match);
  return match ? decodeURIComponent(match[2]) : null;
};

export const isTokenExpired = (isPublicRoute) => {
  try {
    const token = getCookie("token");
    if (!token) throw new Error("Session Expired!");
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload
    const now = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp
    const isExpired = payload.exp <= now;
    if (isExpired) {
      alert("Your session is invalid. Please log in again.");
    }
    return isExpired; // Compare expiry time with current time
  } catch (err) {
    console.error("Error decoding token:", err);
    alert(`error: ${err.message}`);
    return true;
  }
};
