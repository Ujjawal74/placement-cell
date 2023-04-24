const {
  hashPassword,
  compareHash,
  createToken,
  verifyToken,
  createSession,
  destroySession,
  createNewUser,
} = require("../config/utils");
const User = require("../models/user");
const Student = require("../models/student");
const Interview = require("../models/interview");

const userHome = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (req.statusCode == "ok" && req.cred != undefined) {
        return res.status(200).render("dashboard", {
          status: 1,
        });
      } else {
        return res.status(200).render("login", {
          status: -1,
        });
      }
    }
    if (req.method == "POST") {
      // when size of database grows
      // use limit, offset or pagination instead
      // findind all
      // .sort({ createdAt: -1 }); to reverse by latest by a field
      const students = await Student.find().populate("interviews.interview");
      const interviews = await Interview.find().populate("students");
      res.status(200).json({ status: "ok", students, interviews });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (req.statusCode == "ok" && req.cred != undefined) {
        return res.redirect("/");
      }
      return res.status(200).render("login", {
        status: -1,
      });
    }
    if (req.method == "POST") {
      if (req.statusCode == 440) {
        destroySession(res);
      }
      if (req.statusCode == "ok" && req.cred != undefined) {
        return res.status(302).json({ status: 302 });
      }
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const isMatch = await compareHash(req.body.password, user.password);
        if (isMatch) {
          const token = createToken({ id: user.id });
          createSession(res, token);
          res.status(200).json({ status: 200 });
        } else {
          res.status(401).json({ status: 401 });
        }
      } else {
        res.status(404).json({ status: 404 });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userRegister = async (req, res) => {
  try {
    if (req.method == "GET") {
      if (req.statusCode == "ok" && req.cred != undefined) {
        return res.redirect("/");
      }
      return res.status(200).render("signup", {
        status: -1,
      });
    }
    if (req.method == "POST") {
      if (req.statusCode == 440) {
        destroySession(res);
      }
      if (req.statusCode == "ok" && req.cred != undefined) {
        return res.status(302).json({ status: 302 });
      }
      req.body.password = await hashPassword(req.body.password);
      const response = await createNewUser(req.body);
      if (response.status == "ok") {
        const token = createToken({ id: response.data.id });
        createSession(res, token);
        return res.status(200).json({ status: 200 });
      } else {
        return res.status(500).json({ status: response.status });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogout = (req, res) => {
  destroySession(res);
  return res.redirect("/login");
};

const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const data = await student.save();
    if (data) {
      res.status(200).json({ status: "ok", data });
    } else {
      res.status(500).json({ status: "error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error });
  }
};

const editStudent = async (req, res) => {
  try {
    let obj = {
      name: req.body.name,
      email: req.body.email,
      college: req.body.college,
      batch: req.body.batch,
      placement_status: req.body.placement_status,
      dsa_score: req.body.dsa_score,
      web_dev_score: req.body.web_dev_score,
      react_score: req.body.react_score,
    };
    const student = await Student.findOneAndUpdate(
      {
        _id: req.body.student_id,
      },
      { $set: obj },
      {
        new: true,
      }
    );

    if (student) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(500).json({ status: "Error!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error });
  }
};

const createInterview = async (req, res) => {
  try {
    console.log(req.body);
    const interview = new Interview(req.body);
    const data = await interview.save();
    if (data) {
      res.status(200).json({ status: "ok", data });
    } else {
      res.status(500).json({ status: "error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error });
  }
};

const editInterview = async (req, res) => {
  try {
    // console.log(req.body);
    const student = await Student.findOne({ email: req.body.email });

    if (student) {
      const studentId = student.id;
      const obj = {
        interview: req.body.interviewId,
        status: req.body.placement_status,
      };
      student.interviews.push(obj);
      const resp = await student.save();

      const interview = await Interview.findOne({ _id: req.body.interviewId });
      interview.students.push(studentId);
      const resp2 = await interview.save();

      // console.log(resp);
      // console.log(resp2);

      res.status(200).json({ status: "ok" });
    } else {
      res.status(404).json({ status: "user not found with this email" });
    }
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ status: "error", error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.deleteOne({ _id: req.body.id });
    if (student) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(200).json({ status: "unable to delete" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.deleteOne({ _id: req.body.id });
    if (interview) {
      res.status(200).json({ status: "ok" });
    } else {
      res.status(200).json({ status: "unable to delete" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};


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
