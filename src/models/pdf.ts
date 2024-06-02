import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  message: {
    type: String,
    required: [true, "Message content is required."],
  },
  userId: {
    type: String,
    required: [true, "User ID is required."],
  },
  isUserMessage: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PDFSchema = new Schema({
  filename: {
    type: String,
    required: [true, "Filename is required."],
  },
  url: {
    type: String,
    required: [true, "URL is required."],
  },
  key: {
    type: String,
    required: [true, "Key is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: [true, "User ID is required."],
  },
  uploadStatus: {
    type: String,
    enum: ["PENDING", "PROCESSING", "COMPLETE"],
    default: "PENDING",
  },
  messages: [MessageSchema], // Embedding MessageSchema here
});

const PDF = models.PDF || model("PDF", PDFSchema);

export default PDF;
