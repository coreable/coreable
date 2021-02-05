export const capitalize = (str) => {
  if (str.length) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
