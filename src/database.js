const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "Zindex",
  port:"3606"
});

connection.connect((errorConnection) => {
  if (errorConnection) {
    console.log("Error en la conexion de la base de datos", errorConnection);
  }
  if (!errorConnection) {
    console.log("Conexion exitosa con la base de datos");
  }
});

module.exports = {
  connection,
};
