const Router = require("express").Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fields: 1, fileSize: 6000000, files: 10, parts: 100 },
});

const { authenticate } = require("./../libs/users");
const { createEmployee } = require("./../libs/employee");

const { Err, Success} = require("./../libs/response");
const {precedence, checkPermission } = require("./../libs/permissions");

Router.all("/:route", async (req, res, next) => {
  const token = req.headers.cookie && req.headers.cookie.split("=")[1];

  if (!token) {
    res.status(403).json(Err(403, "The user is not logged in."));
  }

  const auth = await authenticate({ token });

  if (auth && auth.err) {
    res.status(auth.status).json(auth);
    return;
  }

  if (auth && auth.success) {
    req.body.user = auth;

    
    
    next();
  } else {
    res.status(401).send(Err(`401`, "Unauthorized: Please login."));
  }
});

Router.get("/check", (req, res) => {
  console.log("Check", req.bosdy.user);

  res.json({ user: req.body.user });
});

// Read Employee information
Router.get("/employees", (req, res) => {
  // Get employee details

  console.log("User", req.body.user);
});

Router.post("/employees", upload.array("file", 100), (req, res) => {
  // Create new employees
  const files = req.files;

  let status = false;

  files.map(async (file) => {
    if (file.mimetype !== "application/pdf") return;

    const username = file.originalname;
    const result = await createEmployee(username, file.buffer);

    console.log(result);
  });

  res.send(res.files);
});

Router.put("/employee/:username", (req, res) => {
  s;
  // Update Employees
});

Router.delete("/employee/:username", (req, res) => {
  // Delete Employees
});

module.exports = Router;
