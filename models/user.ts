import { IUser } from '@/types/user';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
