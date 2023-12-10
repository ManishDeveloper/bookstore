const express = require("express");
const app = express();
const cors = require("cors");

//db connect
require("./config/db");

//midddlware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));

//server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
