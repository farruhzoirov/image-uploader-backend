export const isString = function(text) {
  if (typeof text === "undefined" || text === null || typeof text !== "string") {
    return false;
  }
  return true;
}



