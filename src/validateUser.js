const { dynamodb } = require("../config/db.js");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const validateUser = async (event) => {
  const { id } = event.pathParameters;
  const validated = true;

  await dynamodb
    .update({
      TableName: "Users",
      Key: { id },
      UpdateExpression: "set validated = :validated",
      ExpressionAttributeValues: {
        ":validated": validated,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: {
      message: `User with id: ${id} validated`,
    },
  };
};

module.exports = {
  validateUser: middy(validateUser).use(jsonBodyParser()),
};
