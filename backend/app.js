const express = require("express");
const path = require("path");
const app = express();
const PORT = 5500;
const gameRoutes = require("./routes/gameRoutes");

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}, zacznijmy grę`);
});

app.use(express.static(path.join(__dirname, "public")));

gameRoutes(app);
