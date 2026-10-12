const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Job", "Internship"],
    },

    location: {
      type: String,
      required: true,
    },

    appliedDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Selected",
        "Rejected",
        "Offer",
      ],
      default: "Applied",
    },

    jobUrl: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);