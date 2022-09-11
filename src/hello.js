"use strict";

const hello = async () => {
  return {
    status: 200,
    body: {
      message: "Hello World!",
    },
  };
};

module.exports = {
  hello,
};
