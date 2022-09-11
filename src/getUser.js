const { dynamodb } = require("../config/db.js");

const getUser = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamodb
      .get({
        TableName: "Users",
        Key: { id },
      })
      .promise();

    const user = result.Item;

    if (user) {
      return {
        status: 200,
        body: user,
      };
    } else {
      return {
        status: 200,
        body: {
          message: `Id: ${id} does not exists`,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
};
