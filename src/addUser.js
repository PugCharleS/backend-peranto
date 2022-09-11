const { v4 } = require("uuid");
const { dynamodb } = require("../config/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const addUser = async (event) => {
  try {
    const { name, lastName, CURP, OCR, validity, img } = event.body;
    const createdAt = JSON.stringify(new Date());
    const id = v4();

    const newUser = {
      id,
      name,
      lastName,
      CURP,
      OCR,
      validity,
      img,
      createdAt,
      validated: false,
    };

    await dynamodb
      .put({
        TableName: "Users",
        Item: newUser,
      })
      .promise();

    return {
      status: 200,
      body: newUser,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser: middy(addUser).use(jsonBodyParser()),
};
