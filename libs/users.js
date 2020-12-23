const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users } = require('./collections');

async function doesUserExist(creds) {
  const { username } = creds;

  if (!username)
    return false;

  const users = await Users();
  const user = await users.findOne({ username });

  if(!user) return false;

  return true;
}

async function createUser(creds) {
  const { username, password, role, file } = creds;

  const users = await Users();
  const passHash = await bcrypt.hash(password, 10);

  const doc = {
    username,
    password: passHash
  }

  const result = await users.insertOne(doc); 
  // 1 if success => true
  return result.insertedCount;
}

async function updateUser({ username, role, fileId }){
  const users = await Users();
  // const user = await users.findOne({ username });

  if(!user) return null;

  const update = {
    $set: {
      username, 
      role, 
      fileId
    }
  }

  const status = await user.updateOne({ username }, update);
  
  return status? true : false;
}

async function deleteUser({username}){
  const users = await Users();

  const status = await users.deleteOne({username});

  return status? true : false;
}

// Log in the user
function authorize(creds) {
  const { username, password } = creds;

  return true;
}

// authenticate the logged in user
function authenticate(creds){
  const {token} = creds;

  return true;
}


doesUserExist({ username: "pavittarx" });

module.exports = {
  doesUserExist,
  createUser,
  updateUser,
  deleteUser,
  authorize,
};
