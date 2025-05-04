import bcrypt from 'bcryptjs';  
class HashProvider {
    async compareHash(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
  async generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
export default new HashProvider();