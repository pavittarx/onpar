const roles = {
  1: "admin",
  2: "employee"
}

function checkRole(user, type){
  if(Object.values(roles).includes(type) && user.roles && user.roles.includes(type)) return true;

  return false;
}

function checkPermissions(user) {
  // The user is admin / superuser
  if(user.role && user.role === roles[1]){
    return defaultPerms(roles[1]);
  }

  if(user.role && user.role === roles[2]){
    return defaultPerms(roles[2]);
  }

  return false;
}

function precedence(roles) {
  if(!roles) return null;

  for(let i=0; i<roles.length; i++){
    if(roles.include(roles[1])) 
      return roles[1];
  }

  return null;
}

function defaultPerms(userType){
  if(userType === roles[1]){
    return {
      create: true,
      read: true,
      update: true,
      delete: true
    };
  }

  if(userType === roles[2]){
    return {
      read: true
    }
  }

  return {};
}

module.exports = {
  checkRole: checkRole,
  default: defaultPerms,
  precedence: precedence,
  checkPerms: checkPermissions
}