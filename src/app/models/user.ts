import { Document, Schema, Model, model } from 'mongoose';
import { IUserType } from '../core/api-introspection';

interface User extends IUserType, Document {
  id: string;
}

export const UserSchema: Schema = new Schema(
  {
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String,
    displayName: String,
    type: String,
    password: String,
  },
  { collection: 'user' }
);
UserSchema.pre('save', function(next) {
  const now = new Date();
  if (!this['createdAt']) {
    this['createdAt'] = now;
  }
  next();
});
UserSchema.methods.fullName = function(): string {
  return this.firstName.trim() + ' ' + this.lastName.trim();
};

export const User: Model<User> = model<User>('user', UserSchema);
