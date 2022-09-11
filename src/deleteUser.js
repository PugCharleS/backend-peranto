const { dynamodb } = require("../config/db.js");

const deleteUser = async (event) => {
  try {
    const { id } = event.pathParameters;

    await dynamodb
      .delete({
        TableName: "Users",
        Key: { id },
      })
      .promise();

    return {
      status: 200,
      body: {
        message: `User with id: ${id} deleted`,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteUser,
};
