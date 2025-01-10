import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/backend/config/database';
import { AuthService } from '@/backend/modules/auth/authService';
import { loginSchema } from '@/backend/modules/auth/authValidation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    
    const validatedData = loginSchema.parse(req.body);
    const authData = await AuthService.login(validatedData);
    
    if (!authData) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json(authData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

