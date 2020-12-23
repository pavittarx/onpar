module.exports = (req, res, next) =>{
  console.log("[Log ", Date.now(), "]", req.url);
  next();
}
