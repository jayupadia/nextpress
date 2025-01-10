import mongoose from 'mongoose';
import UserSchema from './UserSchema';

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

