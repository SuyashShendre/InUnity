const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", require("./src/routes/users.route"));
app.use("/api/v1/tasks", require("./src/routes/tasks.route"));

app.listen(process.env.PORT, () => {
  console.log("Nodo server running on port" + process.env.PORT);
});
