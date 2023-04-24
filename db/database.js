const mongoose = require("mongoose");

const connectDB = () => {
  // handle initial err.
  try {
    mongoose
      .connect("mongodb://localhost:27017/placement_cell", {
        useNewUrlParser: true,
      })
      .then(
        () => {
          console.log("connected!");
        },
        (err) => {
          console.log("error in connection!", err);
        }
      );

    // To handle errors after initial connection was established
    mongoose.connection.on("error", (err) => {
      console.log("error in running db connection", err);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;


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
