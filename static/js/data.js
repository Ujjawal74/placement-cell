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


var studentData = {};
var interviewData = {};

window.onload = function () {
  loadData();
  document.addEventListener("click", eventClicker);
};

// event handlers
async function eventClicker(e) {
  // student controllers
  if (e.target.hasAttribute("data-student_view")) {
    let id = e.target.dataset.student_view;
    // console.log(id);
    // console.log(studentData[id]);
    // console.log(studentData[id].name);
    const tag = document.querySelector("#view-window #name");
    // console.log(tag);

    document.querySelector("#view-window #name").innerHTML =
      studentData[id].name;
    document.querySelector("#view-window #email").innerHTML =
      studentData[id].email;
    document.querySelector("#view-window #college").innerHTML =
      studentData[id].college;
    document.querySelector("#view-window #batch").innerHTML =
      studentData[id].batch;
    document.querySelector("#view-window #status").innerHTML =
      studentData[id].placement_status;
    document.querySelector("#view-window #dsa_score").innerHTML =
      studentData[id].dsa_score;
    document.querySelector("#view-window #web_dev_score").innerHTML =
      studentData[id].web_dev_score;
    document.querySelector("#view-window #react_score").innerHTML =
      studentData[id].react_score;

    let interviews = document.querySelector("#view-window #student-interviews");

    for (let i = 0; i < studentData[id].interviews.length; i++) {
      let html = `<div class="interview">
                    <div class="entry">
                      <div class="field-name">Company</div>
                      <div class="field-value">${studentData[id].interviews[i].interview.company_name}</div>
                    </div>
                    <div class="entry">
                      <div class="field-name">Date</div>
                      <div class="field-value">${studentData[id].interviews[i].interview.date}</div>
                    </div>
                    <div class="entry">
                      <div class="field-name">Result</div>
                      <div class="field-value">${studentData[id].interviews[i].status}</div>
                    </div>
                  </div>`;

      interviews.insertAdjacentHTML("afterbegin", html);
    }

    viewWindow.style.left = "50%";
    viewWindow.style.transform = "scale(1) translate(-50%, 0)";
  }

  if (e.target.hasAttribute("data-student_edit")) {
    let id = e.target.dataset.student_edit;

    document.querySelector("#edit-window #hidden-student-id").value =
      studentData[id]._id;
    document.querySelector("#edit-window #name").value = studentData[id].name;
    document.querySelector("#edit-window #email").value = studentData[id].email;
    document.querySelector("#edit-window #college").value =
      studentData[id].college;
    document.querySelector("#edit-window #batch").value = studentData[id].batch;
    document.querySelector("#edit-window #status").value =
      studentData[id].placement_status;
    document.querySelector("#edit-window #dsa_score").value =
      studentData[id].dsa_score;
    document.querySelector("#edit-window #web_dev_score").value =
      studentData[id].web_dev_score;
    document.querySelector("#edit-window #react_score").value =
      studentData[id].react_score;

    editWindow.style.left = "50%";
    editWindow.style.transform = "scale(1) translate(-50%, 0)";
  }

  if (e.target.hasAttribute("data-student_delete")) {
    let id = e.target.dataset.student_delete;
    const res = await PostReqGetRes("/delete/student", { id });
    if (res.status == "ok") {
      toastr.warning("deleted!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error(res.status);
    }
  }

  // interview contollers

  if (e.target.hasAttribute("data-interview_edit")) {
    let id = e.target.dataset.interview_edit;
    console.log(id);
    console.log(interviewData[id]);
    editInterviewWindow.style.left = "50%";
    editInterviewWindow.style.transform = "scale(1) translate(-50%, 0)";

    document.querySelector("#edit-interview-window #company-value").innerHTML =
      interviewData[id].company_name;
    document.querySelector("#edit-interview-window #company-date").innerHTML =
      interviewData[id].date;
    document.querySelector(
      "#edit-interview-window #hidden-interview-id"
    ).value = interviewData[id]._id;

    let studentsAdded = document.querySelector(
      "#edit-interview-window #all_students_interview_status"
    );
    for (let i = 0; i < interviewData[id].students.length; i++) {
      let html = `<tr>
                    <td>${interviewData[id].students[i].email}</td>
                  </tr>`;

      studentsAdded.insertAdjacentHTML("beforeend", html);
    }
  }

  if (e.target.hasAttribute("data-interview_delete")) {
    let id = e.target.dataset.interview_delete;
    const res = await PostReqGetRes("/delete/interview", { id });
    if (res.status == "ok") {
      toastr.warning("deleted!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error(res.status);
    }
  }
}

const loadData = async () => {
  try {
    const res = await PostReqGetRes("/", {});
    // console.log(res);

    if (res.status == "ok") {
      const allStudents = document.getElementById("all-students");
      const allInterviews = document.getElementById("all-interviews");

      for (let i = 0; i < res.students.length; i++) {
        let html = `<div class="item">
                <div class="info"><p>${res.students[i].name}</p></div>
                <div class="actions">
                <i class="fa fa-eye" data-student_view="${res.students[i]._id}"></i>
                <i class="fa fa-edit" data-student_edit="${res.students[i]._id}"></i>
                <i class="fa fa-trash" data-student_delete="${res.students[i]._id}"></i>
                </div>
            </div>`;

        studentData[res.students[i]._id] = res.students[i];
        allStudents.insertAdjacentHTML("afterbegin", html);
      }
      for (let i = 0; i < res.interviews.length; i++) {
        let html = `<div class="item">
                <div class="info"><p>${res.interviews[i].company_name}</p></div>
                <div class="actions">
                <i class="fa fa-edit" data-interview_edit="${res.interviews[i]._id}"></i>
                <i class="fa fa-trash" data-interview_delete="${res.interviews[i]._id}"></i>
                </div>
            </div>`;

        interviewData[res.interviews[i]._id] = res.interviews[i];
        allInterviews.insertAdjacentHTML("afterbegin", html);
      }
    }

    // console.log(studentData, interviewData);
  } catch (error) {
    console.log(error);
  }
};

const addInterviewResultToStudent = async () => {
  try {
    let email = document.querySelector(
      "#edit-interview-window .interviews #email"
    ).value;
    let placement_status = document.querySelector(
      "#edit-interview-window .interviews #status"
    ).value;

    let interviewId = document.querySelector(
      "#edit-interview-window #hidden-interview-id"
    ).value;

    let obj = {
      interviewId,
      email,
      placement_status,
    };
    const res = await PostReqGetRes("/edit/interview", obj);
    console.log(res);
    if (res.status == "ok") {
      toastr.success("Success!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error(res.status);
    }
  } catch (error) {
    console.log(error);
  }
};

async function editStudent() {
  try {
    let student_id = document.querySelector(
      "#edit-window #hidden-student-id"
    ).value;

    let name = document.querySelector("#edit-window #name").value;
    let email = document.querySelector("#edit-window #email").value;
    let college = document.querySelector("#edit-window #college").value;
    let batch = document.querySelector("#edit-window #batch").value;
    let placement_status = document.querySelector("#edit-window #status").value;
    let dsa_score = document.querySelector("#edit-window #dsa_score").value;
    let web_dev_score = document.querySelector(
      "#edit-window #web_dev_score"
    ).value;
    let react_score = document.querySelector("#edit-window #react_score").value;

    const obj = {
      student_id,
      name,
      email,
      college,
      batch,
      placement_status,
      dsa_score,
      web_dev_score,
      react_score,
    };

    const res = await PostReqGetRes("/edit/student", obj);
    console.log(res);
    if (res.status == "ok") {
      toastr.info("Updated!");
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    } else {
      toastr.error(res.status);
    }
  } catch (error) {
    console.log(error);
  }
}
