const express = require("express");
const app = express();
const morgan = require("morgan");

const querys = require("./routes/queries");

app.set("port", 3000);

app.use(express.json());
app.use(morgan("dev"));

app.use(querys);

app.listen(app.get("port"), () => {
  console.log(`Server online: http://localhost:${app.get("port")}`);
});
