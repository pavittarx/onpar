const { Err, Success } = require("./response");
const { createUser, doesUserExist, updateUser } = require("./users");

const { mongo, db } = require("./../db/index");

const { Readable } = require("stream");
const { read } = require("fs");

const validEmployeeId = function (id) {
  if (!id) return false;

  // remove .pdf , if exists
  const eId = id.trim().split(".")[0];

  if (eId[0] !== "E") return false;

  // remove E- & split the rest
  const x_id = eId.split("-")[1].split("");

  return x_id.reduce((a, c) => {
    if (a == false) return false;

    return isNaN(c) ? false : true;
  }, true);
};

async function createEmployee(username, fileBuffer) {
  // detach .pdf
  const username = username.split(".")[0];

  if (!validEmployeeId(username))
    return Err(400, `Invalid Employeed Id (username)`);
  const bucket = new mongo.GridFSBucket(await db, { bucketName: "employees" });

  const readStream = new Readable();
  readStream.push(fileBuffer);
  readStream.push(null);

  const uStream = bucket.openUploadStream(username);

  readStream.pipe(uStream);

  uStream.on("error", () => {
    return Err(400, "An error occured while making upload");
  });

  uStream.on("finish", async () => {
    if (!(await doesUserExist({ username }))) {
      createUser({
        username,
        password: username,
        role: "employee",
        fileId: uStream.id,
      });
    } else {
      updateUser({ username, role: "employee", fileId: uStream.id });
    }

    return Success(`File uploaded successfully: ${uStream.id}`);
  });
}

module.exports = {
  createEmployee,
};
