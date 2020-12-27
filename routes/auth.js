const Router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { doesUserExist, createUser, authorize } = require("./../libs/users");
const { Err, Success } = require("../libs/response");

Router.post("/signup", async (req, res) => {

  const {username, password} = req.body;

  if(!username && !password){
    res.status(400).json(Err(400, 'Credentials Missing (required): username, password'));
    return;
  }

  if (await doesUserExist({username})) {
    res.status(400);
    res.send(Err(400, `User ${username} already exists.`));
    return ;
  }

  const status = await createUser({ username, password });

  if(status){
    res.status(200);
    res.send(Success(`User: ${username} has been successfully created.`));
  }else{
    res.status(400);
    res.send(Err(400, `An unknown error occured while created user: ${username}. Please try again later.`));
    return ;
  }
});

Router.post("/login", async (req, res) => {
  // Log in new user
  const { username, password } = req.body;

  if(!username && !password) {
    res.status(400).json(Err(400, 'Credentials Missing (required): username, password'));
  }

  const token = await authorize({username, password});

  if(token.error){
    res.status(400).json(token);
  }

  res
      .cookie("token", token, { path: "/api", httpOnly: true })
      .send(Success(`The user: ${username} as been logged in successfully.`));
});

module.exports = Router;
