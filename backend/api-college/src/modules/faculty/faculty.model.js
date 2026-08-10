const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    image: {
      publicId: String,
      secureUrl: String,
      optimizedUrl: String,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      publicId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
      optimizedUrl: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Faculty", facultySchema);
