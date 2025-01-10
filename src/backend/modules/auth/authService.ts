import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/users/UserModel';
import { AUTH_CONFIG } from '../../config/constants';
import type { LoginInput, RegisterInput } from './authValidation';
import type { AuthToken } from '../../models/auth/AuthTypes';

export class AuthService {
  static async register(data: RegisterInput): Promise<AuthToken> {
    const hashedPassword = await bcrypt.hash(data.password, AUTH_CONFIG.SALT_ROUNDS);
    
    const user = await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      AUTH_CONFIG.JWT_SECRET,
      { expiresIn: AUTH_CONFIG.JWT_EXPIRY }
    );

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  static async login(data: LoginInput): Promise<AuthToken | null> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) return null;

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      AUTH_CONFIG.JWT_SECRET,
      { expiresIn: AUTH_CONFIG.JWT_EXPIRY }
    );

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}

