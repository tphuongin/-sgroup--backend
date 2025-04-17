import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.config.js';

export default class ValidateUser {
  validateID(req, res, next) {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    next();
  }

  validateInfor(req, res, next) {
    const userInfor = req.body;
    if (!userInfor.name || !userInfor.age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }
    next();
  }

  async isUserExists(req, res, next) {
    if (req.params.id) {
      const userId = new ObjectId(req.params.id);
      const userCollection = getDB().collection('users');
      const user = await userCollection.findOne({ _id: userId });
      if (user) {
        next();
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      return res.status(400).json({ message: 'Missing user ID' });
    }
  }
}
