const { db } = require("./../db/index");

const { USERS_VAR } = require("./constants");

async function Users(){
  return await (await db).collection(USERS_VAR);
} 

module.exports = {
  Users,
}