const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    courses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },

        totalFee: {
          type: Number,
          required: true,
        },

        yearly: {
          type: Number,
          required: true,
        },

        admissionFee: {
          type: Number,
          default: 0,
        },
      },
    ],

    location: {
      type: String,
      required: true,
    },

    university: {
      type: String,
      required: true,
    },

    activities: [
      {
        type: String,
      },
    ],

    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("College", collegeSchema);