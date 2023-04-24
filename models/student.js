const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    placement_status: {
      type: String,
      enum: ["placed", "not_placed"],
      required: true,
    },
    dsa_score: {
      type: Number,
      required: true,
    },
    web_dev_score: {
      type: Number,
      required: true,
    },
    react_score: {
      type: Number,
      required: true,
    },
    interviews: [
      {
        // Many to Many Relation [Interview-Student]
        interview: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Interview",
          required: true,
        },
        status: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;


/*
Created By: Connect/Follow me on LinkedIn.
=> https://www.linkedin.com/in/ujjawal-biswas-b40611142/
          _   _                         _  _      _                           
  _   _  (_) (_)  __ _ __      __ __ _ | || |__  (_) ___ __      __ __ _  ___ 
 | | | | | | | | / _` |\ \ /\ / // _` || || '_ \ | |/ __|\ \ /\ / // _` |/ __|
 | |_| | | | | || (_| | \ V  V /| (_| || || |_) || |\__ \ \ V  V /| (_| |\__ \
  \__,_|_/ |_/ | \__,_|  \_/\_/  \__,_||_||_.__/ |_||___/  \_/\_/  \__,_||___/
       |__/|__/                                                                                                                                                                               
*/
