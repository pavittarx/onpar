const { mongo, db } = require('./../db/index');

const { createUser, doesUserExist } = require("./users");

const bucket = new mongo.GridFSBucket(db, {bucketName: 'employees'}); 

const validEmployeeId  = function(id){
  if(!id) return false;

  // remove .pdf , if exists
  const eId = id.trim().split(".")[0];

  if(eId[0] !== 'E') return false;

  // remove E- & split the rest
  const x_id = (eId.split('-')[1]).split("");

  return x_id.reduce((a,c) => {
    if(a == false) return false;

    return isNaN(c)? false : true;
  }, true);
  
}

async function createEmployee(username, file){

  if(!validEmployeeId()) return `Invalid Employeed Id (username)`;

  const uStream = bucket.openUploadStream(file);

  uStream.on('error', () => {
    return 'An error occured while making upload';
  })

  uStream.on('finish', () => {
    return `File uploaded successfully: ${uStream.id}`
  })

  if(!(await doesUserExist())){
    createUser({username, password: username, role: 'employee', id: uStream.id }); 
  } // else update user
}

module.exports = {
  createEmployee
}