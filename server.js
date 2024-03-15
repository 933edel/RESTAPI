const express = require("express");

const studentRoutes = require("./src/student/routes");

const app = express();

const port = 3000;

app.use(express.json()); //allows to post and get json files from our endpoints

app.get("/", (req, res) => {
  res.send("Hello, this is a back-end focused project. Thankyou.");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`App listening on ${port}.`);
});
