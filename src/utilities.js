import bcrypt from "bcrypt";

class Utilities {
  static generatePasswordHash(password) {
    const custoHash = 12;
    return bcrypt.hash(password, custoHash)
  }
  static validatePassword(password) {
    if(!password.toString()) 
      return false; 
    if(parseInt(password.toString().length) < 8 || parseInt(password.toString().length) > 64)
      return false;
    return true;
  }
}

export default Utilities;