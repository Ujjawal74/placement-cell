const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/utils");
const User = require("../models/user");

const {
  userHome,
  userLogin,
  userRegister,
  userLogout,
  createStudent,
  editStudent,
  createInterview,
  editInterview,
  deleteStudent,
  deleteInterview,
} = require("../controllers/user_controller");

router.get("/", checkAuth, userHome); // to see the [dashboard] on vist home if logged in!
router.post("/", checkAuth, userHome); // to get the data [dashboard] [POST]

router.get("/login", checkAuth, userLogin); // to login [GET]
router.post("/login", checkAuth, userLogin); // to login [POST]

router.get("/signup", checkAuth, userRegister); // to register [GET]
router.post("/signup", checkAuth, userRegister); // to register [POST]

router.post("/create/student", checkAuth, createStudent); // create student
router.post("/edit/student", checkAuth, editStudent); // edit student

router.post("/create/interview", checkAuth, createInterview); // create interview
router.post("/edit/interview", checkAuth, editInterview); // edit interview

router.post("/delete/student", checkAuth, deleteStudent); // delete student
router.post("/delete/interview", checkAuth, deleteInterview); // delete interview

router.get("/logout", userLogout);

module.exports = router;


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
