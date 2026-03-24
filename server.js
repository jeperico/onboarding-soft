const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const buildPath = __dirname;

app.use(express.static(buildPath));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
