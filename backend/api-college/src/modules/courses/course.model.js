const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    courseUrl: {
      type: String,
    },

    description: {
      type: String,
    },

    duration: {
      type: String,
      required: true,
    },
    coreSubjects: [
      {
        type: String,
      },
    ],
    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Course", courseSchema);
