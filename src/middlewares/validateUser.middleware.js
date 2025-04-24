export default class ValidateUser {
  validateRegister(req, res, next) {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ message: 'Invalid email format' });
      }

      if (password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }

      next();
  }
}