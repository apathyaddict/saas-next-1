import { Schema, model, models, Document, Model } from "mongoose";

// Define the User interface extending Mongoose's Document
interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
}

// Define the user schema with proper type annotations
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

// Check if user model already exists, if not create a new one
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
