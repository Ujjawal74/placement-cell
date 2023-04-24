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


// Global Toaster Setting
toastr.options = {
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-center",
  timeOut: "2000",
};

// Create Student DOM
const addStudentBtn = document.getElementById("addStudent");
const createWindow = document.getElementById("create-window");
const closeCreatePopupBtn = document.getElementById("close-create-popup");

// View Student DOM
const viewWindow = document.getElementById("view-window");
const closeViewPopupBtn = document.getElementById("close-view-popup");

// Edit Student DOM
const editWindow = document.getElementById("edit-window");
const closeEditPopupBtn = document.getElementById("close-edit-popup");

// Add Interview DOM
const addInterviewBtn = document.getElementById("addInterview");
const createInterviewWindow = document.getElementById(
  "create-interview-window"
);
const closeCreateInterviewPopupBtn = document.getElementById(
  "close-create-interview-popup"
);

// Edit Interview DOM
const editInterviewWindow = document.getElementById("edit-interview-window");
const closeeditInterviewPopupBtn = document.getElementById(
  "close-edit-interview-popup"
);

// close student view
if (closeViewPopupBtn) {
  closeViewPopupBtn.addEventListener("click", function () {
    viewWindow.style.left = "-100%";
    viewWindow.style.transform = "scale(0) translate(0)";
  });
}

// close student edit
if (closeEditPopupBtn) {
  closeEditPopupBtn.addEventListener("click", function () {
    editWindow.style.left = "-100%";
    editWindow.style.transform = "scale(0) translate(0)";
  });
}

// Add Student
if (addStudentBtn) {
  addStudentBtn.addEventListener("click", function () {
    createWindow.style.left = "50%";
    createWindow.style.transform = "scale(1) translate(-50%, 0)";
  });
}

if (closeCreatePopupBtn) {
  closeCreatePopupBtn.addEventListener("click", function () {
    console.log("close");
    createWindow.style.left = "-100%";
    createWindow.style.transform = "scale(0) translate(0)";
  });
}

// Add Interview
if (addInterviewBtn) {
  addInterviewBtn.addEventListener("click", function () {
    createInterviewWindow.style.left = "50%";
    createInterviewWindow.style.transform = "scale(1) translate(-50%, 0)";
  });
}

if (closeCreateInterviewPopupBtn) {
  closeCreateInterviewPopupBtn.addEventListener("click", function () {
    createInterviewWindow.style.left = "-100%";
    createInterviewWindow.style.transform = "scale(0) translate(0)";
  });
}

// Edit Interview
// close edit interview model
if (closeeditInterviewPopupBtn) {
  closeeditInterviewPopupBtn.addEventListener("click", function () {
    editInterviewWindow.style.left = "-100%";
    editInterviewWindow.style.transform = "scale(0) translate(0)";
  });
}

// XHR Request
const GetReqGetRes = async (uri) => {
  try {
    const res = await fetch(uri);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const PostReqGetRes = async (uri, obj) => {
  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Sign In Button Click

async function signInUser() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      const res = await PostReqGetRes("/login", {
        email,
        password,
      });
      // console.log(res);
      if (res.status == 200) {
        toastr.success("Redirecting", "Login Success");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
      if (res.status == 302) {
        toastr.info("Redirecting", "Already Logged In");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
      if (res.status == 404) {
        toastr.error("Not Found!", "No user found!");
      }
      if (res.status == 401) {
        toastr.warning("Something Went Wrong", "Invalid Credentials!");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// signup user
async function signUpUser() {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (name && email && password) {
      const res = await PostReqGetRes("/signup", {
        name,
        email,
        password,
      });
      console.log(res);
      if (res.status == 200) {
        toastr.success("Redirecting", "Registration Success");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
      if (res.status == 302) {
        toastr.info("Redirecting", "Already logged in!");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
      if (res.status == 500) {
        toastr.error("Error", "Something went Wrong!");
      }
      if (res.status == 11000) {
        toastr.error("User Exists", "User With Same Email Exists!");
      }
    } else {
      toastr.error("Field is empty", "Fill all fields");
    }
  } catch (error) {
    console.log(error);
  }
}

// logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    window.location.href = "/logout";
  });
}

async function addStudent() {
  try {
    const name = document.querySelector("#create-window #name").value;
    const email = document.querySelector("#create-window #email").value;
    const college = document.querySelector("#create-window #college").value;
    const batch = document.querySelector("#create-window #batch").value;
    const status = document.querySelector("#create-window #status").value;
    const dsa_score = document.querySelector("#create-window #dsa_score").value;
    const web_dev_score = document.querySelector(
      "#create-window #web_dev_score"
    ).value;
    const react_score = document.querySelector(
      "#create-window #react_score"
    ).value;

    const obj = {
      name,
      email,
      college,
      batch,
      placement_status: status,
      dsa_score,
      web_dev_score,
      react_score,
    };
    if (status === "not_selected") {
      return alert("please select placement status");
    }
    console.log(obj);
    const res = await PostReqGetRes("/create/student", obj);
    if (res.status == "ok") {
      toastr.success("Success!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error("Failure!");
    }
  } catch (error) {
    console.log(error);
    toastr.error("Something Went Wrong");
  }
}

async function editStudent() {
  try {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const college = document.getElementById("college");
    const batch = document.getElementById("batch");
    const status = document.querySelector("#create-window #status");
    const dsa_score = document.getElementById("dsa_score");
    const web_dev_score = document.getElementById("web_dev_score");
    const react_score = document.getElementById("react_score");

    const obj = {
      name,
      email,
      college,
      batch,
      placement_status: status,
      dsa_score,
      web_dev_score,
      react_score,
    };
    if (status === "not_selected") {
      return alert("please select placement status");
    }
    console.log(obj);
    const res = await PostReqGetRes("/create/student", obj);
    if (res.status == "ok") {
      toastr.success("Success!");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      toastr.error("Failure!");
    }
  } catch (error) {
    console.log(error);
    toastr.error("Something Went Wrong");
  }
}

async function createInterview() {
  try {
    const company_name = document.querySelector(
      "#create-interview-window #company_name"
    ).value;
    const date = document.querySelector("#create-interview-window #date").value;
    console.log(company_name, date);
    const obj = {
      company_name,
      date,
    };
    const res = await PostReqGetRes("/create/interview", obj);
    if (res.status == "ok") {
      toastr.success("Success!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error("Failure!");
    }
  } catch (error) {
    console.log(error);
    toastr.error("Something Went Wrong");
  }
}
