const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users } = require("./collections");
const { Err, Success } = require("./response");

async function doesUserExist(creds) {
  const { username } = creds;

  if (!username) return false;

  const users = await Users();
  const user = await users.findOne({ username });

  if (!user) return false;

  return true;
}

async function createUser(creds) {
  const { username, password, role, file } = creds;

  const users = await Users();
  const passHash = await bcrypt.hash(password, 10);

  const doc = {
    username,
    password: passHash,
  };

  const result = await users.insertOne(doc);
  // 1 if success => true
  return result.insertedCount;
}

async function updateUser({ username, role, fileId }) {
  const users = await Users();
  const user = await users.findOne({ username });

  if (!user)
    return Err(`The user with given username: ${username} does not exist.`);

  const update = {
    $set: {
      username,
      role,
      fileId,
    },
  };

  const status = await user.updateOne({ username }, update);

  return status
    ? Success(`User: ${username} successfully updated`)
    : Err(503, `Unable to update user : ${username}`);
}

async function deleteUser({ username }) {
  const users = await Users();
  const status = await users.deleteOne({ username });

  return status ? true : false;
}

async function getUser({ username }) {
  const users = await Users();
  const user = await users.findOne({ username });
  return user;
}

// Log in the user
async function authorize(creds) {
  const { username, password } = creds;

  if (!username && !password) {
    return Err(400, "Credentials Missing (required): username, password");
  }

  const users = await Users();
  const user = await users.findOne({ username });

  if (!user) {
    return Err(400, `No such user exist: ${username}`);
  }

  // Compares password with stored hash
  if (!(await bcrypt.compare(password, user.password))) {
    return Err(400, "Incorrect username or password: ${username}");
  }

  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
      roles: user.roles,
      perms: user.perms,
    },
    user.password
  );

  return { token };
}

// authenticate the logged in user
async function authenticate(creds) {
  const { token } = creds;

  const tokenData = await jwt.decode(token);

  if(!tokenData){
    return Err(400, `Invalid Token`);
  }

  const users = await Users();
  const user = await users.findOne({username: tokenData.username});

  if(!user){
    return Err(503, `Your token seems to have been expired. Please log in to continue.`);
  }

  return {
    success: true,
    data: {
      username: user.username,
      roles: user.roles
    }
  };
}

module.exports = {
  doesUserExist,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  authorize,
};
