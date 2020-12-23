const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const compression = require("compression");

const { logger, auth } = require("./middlewares/index");
const { authRouter } = require("./routes/index");

// Express Configuration Middlewares
app
  .use(compression())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

// Project Specific Middlewares
  app.use(logger);

// Binds React App with Express Server
app.use(express.static(path.join(__dirname, "..", "build")));

app.use('/api', authRouter);

app.get("*", (req, res) => {
  res.status(200);
  res.send({
    "message": "Welcome! I hope you'd enjoy your stay."
  })
});

app.listen(process.env.PORT || 5500);

