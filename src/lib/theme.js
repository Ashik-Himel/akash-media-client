export const getTheme = function() {
  return localStorage.getItem("theme") || "system";
}
export const setTheme = function(value) {
  localStorage.setItem("theme", value);
}
export const getSystemTheme = function() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return "dark";
  }
  return "light";
}