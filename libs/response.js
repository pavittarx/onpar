function Err(statusCode, message){
  return {
    error: true,
    status: statusCode,
    message
  }
}

function Success(message){
  return {
    success: true, 
    statusCode: 200,
    message
  }
}

module.exports = {
  Err,
  Success
}