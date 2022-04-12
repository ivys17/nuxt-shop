import jwt from 'jsonwebtoken';

import env from '../env.js';

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
    const decodedData = jwt.verify(token, env.API_JWT_SECRET_KEY);

    if (!decodedData.isAdmin) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }

    req.isAdmin = true;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Пользователь не авторизован' });
  }
}
