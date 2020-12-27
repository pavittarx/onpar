const Router = require("express").Router();

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fields: 1, fileSize: 6000000, files: 10, parts: 100 },
});

const { authenticate } = require("./../libs/users");
const { createEmployee } = require("./../libs/employee");

const { Err, Success } = require("./../libs/response");
const { checkRole } = require("./../libs/permissions");

Router.all("/:route", upload.array("file", 100), async (req, res, next) => {
  const token = req.headers.cookie && req.headers.cookie.split("=")[1];

  if (!token) {
    console.log("No token");
    res.status(403).json(Err(403, "The user is not logged in."));
  }

  const auth = await authenticate({ token });

  if (auth && auth.err) {
    res.status(auth.status).json(auth);
    return;
  }

  if (auth && auth.success) {
    const check = checkRole(auth.data, "admin");

    console.log("> ", req.files, "/n/n/n");

    res.locals.user = auth.data;
    res.locals.files = req.files;

    next();
  }
});

Router.get("/check", (req, res) => {
  console.log("Check", req.body.user);

  res.json({ user: req.body.user });
});

// Read Employee information
Router.get("/employees", (req, res) => {
  // Get employee details

  console.log("User", req.body.user);
});

Router.post("/employees", upload.array("file", 100), (req, res) => {
  // Create new employees
  const files = res.locals.files;

  const result = files.map(async (file) => {
    if (file.mimetype !== "application/pdf") return;

    const username = file.originalname;
    const result = await createEmployee(username, file.buffer);

    return result;
  });

  res.status(200).json(result);
});

Router.put("/employee/:username", (req, res) => {

  // Update Employees
});

Router.delete("/employee/:username", (req, res) => {
  // Delete Employees
});

module.exports = Router;
