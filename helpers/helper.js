

export const isNumber =  (input) => {
  const regex = /^\d+\.\d$/;
  return regex.test(input);
}

export const isString = function(text) {
  return typeof text === 'string'
}



