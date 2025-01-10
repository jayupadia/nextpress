import { User } from '@/shared/types';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface AuthToken {
  token: string;
  user: User;
}

