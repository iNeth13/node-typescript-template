import express from "express";

const app = express();

app.use((req, res) => {
  res.send("hi");
});

app.listen(3000);
