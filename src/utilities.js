import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  static async verifyPassword(password, passwordHash) {
    const userPassword = await bcrypt.compare(password, passwordHash);
    if(!userPassword) return false;
    return true;
  }

  static createTokenJWT(user) {
    const payload = {
      id: user.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
		return token;
  }
}

export default Utilities;