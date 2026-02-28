import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);