const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const compression = require("compression");

const { logger, auth } = require("./middlewares/index");
const { authRouter, adminRouter } = require("./routes/index");

// Express Configuration Middlewares
app
  .use(compression())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(express.static('dist'));

// Project Specific Middlewares
  app.use(logger);

// Binds React App with Express Server
app.use(express.static(path.join(__dirname, "..", "build")));

app.use('/api', authRouter).use('/api', adminRouter);

app.get("*", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log("[Server Ready]: Listening"));