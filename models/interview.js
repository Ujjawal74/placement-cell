const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        // Many To Many Relation [Interview-Student]
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Interview = new mongoose.model("Interview", interviewSchema);

module.exports = Interview;


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
