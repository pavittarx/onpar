const Router = require("express").Router();

const { doesUserExist, createUser } = require("./../libs/users");
const { Err, Success } = require("../libs/response");

Router.post("/signup", async (req, res) => {

  const {username, password} = req.body;

  if(!username && !password){
    res.status(400);
    res.send(Err(400, 'Credentials Missing (required): username, password'));
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

// Login

Router.post("/login", (req, res) => {
  // Log in new user
});

module.exports = Router;
