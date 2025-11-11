(function () {
  if (window.runningStormPreview) {
    return;
  }
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("storm_app_token="))
    ?.split("=")[1];

  if (!token) {
    console.log("No token, redirecting to login");
    window.location.href = "/login.html";
    return;
  }

  // Decode (NOT VERIFY! No signature check)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds

    // Check if expired
    if (Date.now() > expiry) {
      console.log("Token expired!");
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.error("Invalid token", error);
    window.location.href = "/login.html";
  }
})();
