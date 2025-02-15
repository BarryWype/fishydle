export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const delay = ms => new Promise(res => setTimeout(res, ms));