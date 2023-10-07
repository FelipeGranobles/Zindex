const { connection } = require("../database");
const query = async (sql, data) => {
  try {
    const [results] = await connection
      .promise()
      .query(sql, data ? data : undefined);
    return results;
  } catch (error) {
    console.log("Error de Consulta", sql);
  }
};

module.exports = query;
