import { Schema, model, models } from "mongoose";

const PDFSchema = new Schema({
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Pdf",
  // },
  name: {
    type: String,
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
});

const PDF = models.PDF || model("PDF", PDFSchema);

export default PDF;
