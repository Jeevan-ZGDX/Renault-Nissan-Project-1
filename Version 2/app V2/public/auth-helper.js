// returns true if the user is authenticated, false otherwise
function isAuthenticated() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("storm_app_token="));
  return !!token;
}
