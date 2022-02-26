const DEBUG = true;

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test' || DEBUG) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test' || DEBUG) {
    console.error(...params);
  }
};

module.exports = {
  info, error
};