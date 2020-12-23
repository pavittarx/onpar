const roles = {
  1: "admin",
  2: "employee"
}

function checkPermissions(user, type) {
  // The user is admin / superuser
  if(user.role && user.role === roles[1]){
    return true;
  }

  if(user.role && user.role === roles[2]){
    return user.perms[type];
  }

  return false;
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
  default: defaultPerms,
  check: checkPermissions
}