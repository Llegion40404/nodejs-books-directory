import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'http';

export const auth = (req: IncomingMessage, res: ServerResponse) => {
  const token = jwt.sign({ user: 'user' }, 'secret', { expiresIn: '1h' });
  res.setHeader('Authorization', `Bearer ${token}`);
};