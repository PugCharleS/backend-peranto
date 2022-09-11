const { dynamodb } = require("../config/db");

const getUsers = async () => {
  try {
    const result = await dynamodb.scan({ TableName: "Users" }).promise();
    const users = result.Items;

    return {
      status: 200,
      body: {
        users,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
};
