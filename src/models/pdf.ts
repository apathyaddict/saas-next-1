import { Schema, model, models } from "mongoose";

const PDFSchema = new Schema({
  filename: {
    type: String,
    required: [true, "filename is required."],
  },
  url: {
    type: String,
    required: [true, "url is required."],
  },
  key: {
    type: String,
    required: [true, "key is required."],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
});

const PDF = models.PDF || model("PDF", PDFSchema);

export default PDF;
