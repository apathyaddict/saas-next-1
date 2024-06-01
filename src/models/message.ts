import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  fileId: {
    type: String,
    unique: [true],
    required: [true],
  },
  text: {
    type: String,
  },
  userId: {
    type: String,
  },
  isUserMessage: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//check if user exists if not create new
const Message = models.Message || model("User", MessageSchema);

export default Message;
