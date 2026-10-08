// LOGIN

const login = document.querySelector("#loginForm");

if (login) {

    login.addEventListener("submit", function(event) {

        event.preventDefault();

        const IU = document.querySelector("#iu").value;
        const password = document.querySelector("#password").value;

        const IU_pattern = /^IU[0-9]{10}$/;

        if (!IU_pattern.test(IU)) {

            alert("Enter valid Enrollment number!");

        }
        else if (password === "") {

            alert("Please enter your password!");

        }
        else {

            const formData = new FormData();

            formData.append("iu", IU);
            formData.append("password", password);

            fetch("php/student_login.php", {
                method: "POST",
                body: formData
            })

            .then(response => response.text())

            .then(data => {

                if (data === "success") {

                    window.location.href = "dashboard.html";

                }
                else {

                    alert("Wrong Enrollment Number or Password!");

                }

            });

        }

    });

}


// CREATE ACCOUNT

const createAccountForm =
    document.querySelector("#createAccountForm");

if (createAccountForm) {

    createAccountForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.querySelector("#name").value;

        const IU =
            document.querySelector("#newIU").value;

        const email =
            document.querySelector("#email").value;

        const division =
            document.querySelector("#division").value;

        const department =
            document.querySelector("#department").value;

        const semester =
            document.querySelector("#semester").value;

        const password =
            document.querySelector("#newPassword").value;

        const IU_pattern = /^IU[0-9]{10}$/;

        if (!IU_pattern.test(IU)) {

            alert("Enter valid Enrollment number!");

        }
        else if (
            name === "" ||
            email === "" ||
            division === "" ||
            department === "" ||
            semester === "" ||
            password === ""
        ) {

            alert("Please fill all the details.");

        }
        else {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("iu", IU);
            formData.append("email", email);
            formData.append("division", division);
            formData.append("department", department);
            formData.append("semester", semester);
            formData.append("password", password);

            fetch("php/student_register.php", {
                method: "POST",
                body: formData
            })

            .then(response => response.text())

            .then(data => {

                if (data === "success") {

                    alert("Account created successfully!");

                    window.location.href = "index.html";

                }
                else if (data === "exists") {

                    alert("Enrollment number already exists!");

                }
                else {

                    alert("Account creation failed!");

                }

            });

        }

    });

}


// DASHBOARD

const studentIU =
    document.querySelector("#studentIU");

const studentName =
    document.querySelector("#studentName");

const seme =
    document.querySelector("#show_sem");

const submission =
    document.querySelector("#submission");
const dashboardAttendance =
    document.querySelector("#attendance");
const eventList =
    document.querySelector("#eventList");

if (eventList) {

    fetch("php/get_events.php")

    .then(response => response.json())

    .then(events => {

        eventList.innerHTML = "";

        if (events.length === 0) {

            eventList.innerHTML =
                "<p>No events available.</p>";

            return;

        }

        events.forEach(function(event) {

        const eventItem =
        document.createElement("div");

        eventItem.className = "event-card";

            eventItem.innerHTML = `
                <h4>${event.name}</h4>

                <p>
                    <strong>Date:</strong>
                    ${event.event_date}
                </p>

                <p>
                    ${event.description}
                </p>
            `;

            eventList.appendChild(
                eventItem
            );

        });

    })

    .catch(function(error) {

        console.log(
            "Event error:",
            error
        );

        eventList.innerHTML =
            "<p>Unable to load events.</p>";

    });

}
if (studentIU || studentName || seme) {

    fetch("php/student_data.php")

    .then(response => response.json())

    .then(data => {

        if (data.status === "not_logged_in") {

            window.location.href = "index.html";

            return;

        }

        if (studentIU) {

            studentIU.innerHTML = data.iu;

        }

        if (studentName) {

            studentName.innerHTML = data.name;

        }

        if (seme) {

            seme.innerHTML = data.semester;

        }


        // LOAD ASSIGNMENTS

        if (submission) {

            fetch(
                "php/get_assignments.php?department=" +
                encodeURIComponent(data.department) +
                "&semester=" +
                encodeURIComponent(data.semester)
            )

            .then(response => response.json())

            .then(assignments => {

                submission.innerHTML = "";

                if (assignments.length === 0) {

                    submission.innerHTML =
                        "<p>No assignments available.</p>";

                    return;

                }

                assignments.forEach(function(assignment) {

                    const assignmentItem =
                        document.createElement("div");

                    assignmentItem.innerHTML = `
                        <h4>${assignment.assignment_name}</h4>

                        <p>
                            <strong>Subject:</strong>
                            ${assignment.subject}
                        </p>

                        <p>
                            <strong>Submission Date:</strong>
                            ${assignment.submission_date}
                        </p>

                        <p>
                            ${assignment.description}
                        </p>
                    `;

                    submission.appendChild(
                        assignmentItem
                    );

                });

            })

            .catch(function(error) {

                console.log(
                    "Assignment error:",
                    error
                );

                submission.innerHTML =
                    "<p>Unable to load assignments.</p>";

            });

        }

    })

    .catch(function(error) {

        console.log(
            "Student data error:",
            error
        );

    });

}


// RESOURCE FILTER

const dep =
    document.querySelectorAll(".dep");

const sem =
    document.querySelectorAll(".sem");

const type_reso =
    document.querySelectorAll(".type_reso");

let selectedDep = null;
let selectedSem = null;
let selectedTypeReso = null;


// DEPARTMENT

dep.forEach(button => {

    button.addEventListener("click", function(event) {

        dep.forEach(btn => {

            btn.style.backgroundColor =
                "#097c87";

            btn.style.borderColor =
                "#23ced9";

        });

        event.target.style.backgroundColor =
            "white";

        event.target.style.borderColor =
            "#fca47c";

        selectedDep =
            event.target.innerText;

        showResource();

    });

});


// SEMESTER

sem.forEach(button => {

    button.addEventListener("click", function(event) {

        sem.forEach(btn => {

            btn.style.backgroundColor =
                "#097c87";

            btn.style.borderColor =
                "#23ced9";

        });

        event.target.style.backgroundColor =
            "white";

        event.target.style.borderColor =
            "#fca47c";

        selectedSem =
            event.target.innerText;

        showResource();

    });

});


// RESOURCE TYPE

type_reso.forEach(button => {

    button.addEventListener("click", function(event) {

        type_reso.forEach(btn => {

            btn.style.backgroundColor =
                "#097c87";

            btn.style.borderColor =
                "#23ced9";

        });

        event.target.style.backgroundColor =
            "white";

        event.target.style.borderColor =
            "#fca47c";

        selectedTypeReso =
            event.target.innerText;

        showResource();

    });

});


// SHOW RESOURCE

function showResource() {

    const resourceList =
        document.querySelector("#resourcelist");

    if (!resourceList) {

        return;

    }

    if (
        selectedDep === null ||
        selectedSem === null ||
        selectedTypeReso === null
    ) {

        return;

    }


    resourceList.innerHTML =
        "<h2>Available Resources</h2>" +
        "<p>Loading...</p>";


    fetch(
        "php/get_notes.php?department=" +
        encodeURIComponent(selectedDep) +
        "&semester=" +
        encodeURIComponent(selectedSem) +
        "&type=" +
        encodeURIComponent(selectedTypeReso)
    )

    .then(response => response.json())

    .then(notes => {

        resourceList.innerHTML =
            "<h2>Available Resources</h2>";


        if (notes.length === 0) {

            resourceList.innerHTML +=
                "<p>No resource found.</p>";

            return;

        }


        notes.forEach(function(note) {

            const resourceDiv =
                document.createElement("div");


            const resourceName =
                document.createElement("p");

            resourceName.textContent =
                note.name;


            const downloadButton =
                document.createElement("a");

            downloadButton.textContent =
                "Download";

            downloadButton.href =
                "uploads/" +
                encodeURIComponent(note.file_name);

            downloadButton.download =
                note.file_name;


            resourceDiv.appendChild(
                resourceName
            );

            resourceDiv.appendChild(
                downloadButton
            );


            resourceList.appendChild(
                resourceDiv
            );

        });

    })

    .catch(function(error) {

        console.log(
            "Resource error:",
            error
        );

        resourceList.innerHTML =
            "<h2>Available Resources</h2>" +
            "<p>Unable to load resources.</p>";

    });

}


// SUBJECT LIST

const subjects = [

    {
        department: "CSE",
        semester: "Sem 3",
        subject: "Data Structures"
    },

    {
        department: "CSE",
        semester: "Sem 3",
        subject: "Digital Logic"
    },

    {
        department: "CSE",
        semester: "Sem 5",
        subject: "Web Development"
    },

    {
        department: "CSE",
        semester: "Sem 5",
        subject: "DAA"
    },

    {
        department: "CSE",
        semester: "Sem 5",
        subject: "Computer Networks"
    },

    {
        department: "CE",
        semester: "Sem 5",
        subject: "Microprocessor"
    },

    {
        department: "CE",
        semester: "Sem 5",
        subject: "Structural Design"
    },

    {
        department: "IT",
        semester: "Sem 5",
        subject: "Web Technology"
    },

    {
        department: "IT",
        semester: "Sem 5",
        subject: "Database Management"
    }

];


// ATTENDANCE

const att_department =
    document.querySelector("#att_department");

const att_semester =
    document.querySelector("#att_semester");

const att_subject =
    document.querySelector("#att_subject");


function showAttendanceSubjects() {

    if (!att_subject) {

        return;

    }


    att_subject.innerHTML =
        '<option value="">Select Subject</option>';


    const result =
        subjects.filter(subject =>

            subject.department ===
            att_department.value &&

            subject.semester ===
            att_semester.value

        );


    result.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.subject;

        option.innerHTML =
            subject.subject;

        att_subject.appendChild(option);

    });

}


if (att_department && att_semester) {

    att_department.addEventListener(
        "change",
        showAttendanceSubjects
    );

    att_semester.addEventListener(
        "change",
        showAttendanceSubjects
    );

}


// SHOW STUDENTS

const show_students =
    document.querySelector("#show_students");

const student_list =
    document.querySelector("#student_list");


if (show_students) {

    show_students.addEventListener(
        "click",
        function() {

            if (att_department.value === "") {

                alert("Please select department!");

                return;

            }


            if (att_semester.value === "") {

                alert("Please select semester!");

                return;

            }


            if (att_subject.value === "") {

                alert("Please select subject!");

                return;

            }


            student_list.innerHTML =
                "Loading students...";


            fetch(
                "php/get_students.php?department=" +
                encodeURIComponent(
                    att_department.value
                ) +
                "&semester=" +
                encodeURIComponent(
                    att_semester.value
                )
            )

            .then(response => response.json())

            .then(students => {

                student_list.innerHTML = "";


                if (students.length === 0) {

                    student_list.innerHTML =
                        "<p>No students found.</p>";

                    return;

                }


                students.forEach(function(student) {

                    const student_div =
                        document.createElement("div");

                    student_div.className =
                        "student_attendance";

                    student_div.dataset.iu =
                        student.iu;


                    student_div.innerHTML = `

                        <p>
                            <strong>${student.name}</strong>
                            <br>
                            ${student.iu}
                        </p>

                        <button
                            type="button"
                            class="present_button"
                        >
                            Present
                        </button>

                        <button
                            type="button"
                            class="absent_button"
                        >
                            Absent
                        </button>

                    `;


                    student_list.appendChild(
                        student_div
                    );

                });


                addAttendanceButtons();

            })

            .catch(function(error) {

                console.log(error);

                student_list.innerHTML =
                    "<p>Unable to load students.</p>";

            });

        }
    );

}


// PRESENT / ABSENT BUTTONS

function addAttendanceButtons() {

    const students =
        document.querySelectorAll(
            ".student_attendance"
        );


    students.forEach(function(student) {

        const present_button =
            student.querySelector(
                ".present_button"
            );

        const absent_button =
            student.querySelector(
                ".absent_button"
            );


        present_button.addEventListener(
            "click",
            function() {

                student.dataset.status =
                    "Present";

                student.style.backgroundColor =
                    "#d8f3dc";

                present_button.style.backgroundColor =
                    "#00fe7b";

                present_button.style.color =
                    "white";

                absent_button.style.backgroundColor =
                    "#097c87";

            }
        );


        absent_button.addEventListener(
            "click",
            function() {

                student.dataset.status =
                    "Absent";

                student.style.backgroundColor =
                    "#d8f3dc";

                absent_button.style.backgroundColor =
                    "#fca47c";

                absent_button.style.color =
                    "white";

                present_button.style.backgroundColor =
                    "#097c87";

            }
        );

    });

}


// SAVE ATTENDANCE

const attendance_update =
    document.querySelector("#attendance_update");


if (attendance_update) {

    attendance_update.addEventListener(
        "click",
        function() {

            const date =
                document.querySelector("#att_date").value;


            const students =
                document.querySelectorAll(
                    "#student_list .student_attendance"
                );


            if (students.length === 0) {

                alert(
                    "Please show students first."
                );

                return;

            }


            if (date === "") {

                alert("Please select date.");

                return;

            }


            let all_marked = true;


            students.forEach(function(student) {

                if (!student.dataset.status) {

                    all_marked = false;

                }

            });


            if (!all_marked) {

                alert(
                    "Please mark Present or Absent for every student."
                );

                return;

            }


            let saved_count = 0;


            students.forEach(function(student) {

                const iu =
                    student.dataset.iu;

                const status =
                    student.dataset.status;

                const formData =
                    new FormData();


                formData.append(
                    "iu",
                    iu
                );

                formData.append(
                    "department",
                    att_department.value
                );

                formData.append(
                    "semester",
                    att_semester.value
                );

                formData.append(
                    "subject",
                    att_subject.value
                );

                formData.append(
                    "date",
                    date
                );

                formData.append(
                    "status",
                    status
                );


                fetch(
                    "php/save_attendance.php",
                    {
                        method: "POST",
                        body: formData
                    }
                )

                .then(response =>
                    response.text()
                )

                .then(data => {

                    if (data === "success") {

                        saved_count++;


                        if (
                            saved_count ===
                            students.length
                        ) {

                            alert(
                                "Attendance saved successfully!"
                            );

                        }

                    }
                    else {

                        alert(
                            "Attendance could not be saved."
                        );

                    }

                });

            });

        }
    );

}


// SUBMISSION

const sub_department =
    document.querySelector("#sub_department");

const sub_semester =
    document.querySelector("#sub_semester");

const sub_subject =
    document.querySelector("#sub_subject");


function showSubmissionSubjects() {

    if (!sub_subject) {

        return;

    }


    sub_subject.innerHTML =
        '<option value="">Select Subject</option>';


    const result =
        subjects.filter(subject =>

            subject.department ===
            sub_department.value &&

            subject.semester ===
            sub_semester.value

        );


    result.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.subject;

        option.innerHTML =
            subject.subject;

        sub_subject.appendChild(option);

    });

}


if (sub_department && sub_semester) {

    sub_department.addEventListener(
        "change",
        showSubmissionSubjects
    );

    sub_semester.addEventListener(
        "change",
        showSubmissionSubjects
    );

}


// ADD ASSIGNMENT

const addAssignmentButton =
    document.getElementById(
        "add_submission"
    );


if (addAssignmentButton) {

    addAssignmentButton.addEventListener(
        "click",
        function() {

            const department =
                document.getElementById(
                    "sub_department"
                ).value;

            const semester =
                document.getElementById(
                    "sub_semester"
                ).value;

            const subject =
                document.getElementById(
                    "sub_subject"
                ).value;

            const name =
                document.getElementById(
                    "sub_name"
                ).value;

            const date =
                document.getElementById(
                    "sub_date"
                ).value;

            const description =
                document.getElementById(
                    "sub_description"
                ).value;


            if (
                department === "" ||
                semester === "" ||
                subject === "" ||
                name === "" ||
                date === "" ||
                description === ""
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }


            const formData =
                new FormData();


            formData.append(
                "department",
                department
            );

            formData.append(
                "semester",
                semester
            );

            formData.append(
                "subject",
                subject
            );

            formData.append(
                "name",
                name
            );

            formData.append(
                "date",
                date
            );

            formData.append(
                "description",
                description
            );


            fetch(
                "php/add_assignment.php",
                {
                    method: "POST",
                    body: formData
                }
            )

            .then(response =>
                response.text()
            )

            .then(data => {

                if (data.trim() === "success") {

                    alert(
                        "Assignment added successfully."
                    );

                    document.getElementById(
                        "sub_name"
                    ).value = "";

                    document.getElementById(
                        "sub_date"
                    ).value = "";

                    document.getElementById(
                        "sub_description"
                    ).value = "";

                }
                else {

                    alert(
                        "Failed to add assignment."
                    );

                }

            })

            .catch(error => {

                console.log(error);

                alert(
                    "Something went wrong."
                );

            });

        }
    );

}


// FACULTY NOTES

const notes_department =
    document.querySelector(
        "#notes_department"
    );

const notes_semester =
    document.querySelector(
        "#notes_semester"
    );

const notes_subject =
    document.querySelector(
        "#notes_subject"
    );


function showNotesSubjects() {

    if (!notes_subject) {

        return;

    }


    notes_subject.innerHTML =
        '<option value="">Select Subject</option>';


    const result =
        subjects.filter(subject =>

            subject.department ===
            notes_department.value &&

            subject.semester ===
            notes_semester.value

        );


    result.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.subject;

        option.innerHTML =
            subject.subject;

        notes_subject.appendChild(option);

    });

}


if (notes_department && notes_semester) {

    notes_department.addEventListener(
        "change",
        showNotesSubjects
    );

    notes_semester.addEventListener(
        "change",
        showNotesSubjects
    );

}


// ADD NOTES

const addNotesButton =
    document.querySelector("#add_notes");


if (addNotesButton) {

    addNotesButton.addEventListener(
        "click",
        function() {

            const department =
                document.querySelector(
                    "#notes_department"
                ).value;

            const semester =
                document.querySelector(
                    "#notes_semester"
                ).value;

            const subject =
                document.querySelector(
                    "#notes_subject"
                ).value;

            const name =
                document.querySelector(
                    "#notes_name"
                ).value;

            const file =
                document.querySelector(
                    "#notes_file"
                ).files[0];

            const type =
                document.querySelector(
                    "#notes_type"
                ).value;


            if (
                department === "" ||
                semester === "" ||
                subject === "" ||
                type === "" ||
                name === "" ||
                !file
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }


            const formData =
                new FormData();


            formData.append(
                "department",
                department
            );

            formData.append(
                "semester",
                semester
            );

            formData.append(
                "subject",
                subject
            );

            formData.append(
                "type",
                type
            );

            formData.append(
                "name",
                name
            );

            formData.append(
                "file",
                file
            );


            fetch(
                "php/add_notes.php",
                {
                    method: "POST",
                    body: formData
                }
            )

            .then(response =>
                response.text()
            )

            .then(data => {

                if (data.trim() === "success") {

                    alert(
                        "Notes added successfully."
                    );

                    document.querySelector(
                        "#notes_name"
                    ).value = "";

                    document.querySelector(
                        "#notes_file"
                    ).value = "";

                }
                else {

                    alert(
                        "Failed to add notes."
                    );

                }

            })

            .catch(error => {

                console.log(error);

                alert(
                    "Something went wrong."
                );

            });

        }
    );

}


// STUDENT RESOURCE UPLOAD

const student_department =
    document.querySelector(
        "#student_department"
    );

const student_semester =
    document.querySelector(
        "#student_semester"
    );

const student_subject =
    document.querySelector(
        "#student_subject"
    );

const student_upload =
    document.querySelector(
        "#student_upload"
    );


// STUDENT SUBJECTS

function updateStudentSubjects() {

    if (
        !student_department ||
        !student_semester ||
        !student_subject
    ) {

        return;

    }


    student_subject.innerHTML =
        '<option value="">Select Subject</option>';


    if (
        student_department.value === "" ||
        student_semester.value === ""
    ) {

        return;

    }


    const result =
        subjects.filter(subject =>

            subject.department ===
            student_department.value &&

            subject.semester ===
            student_semester.value

        );


    result.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.subject;

        option.textContent =
            subject.subject;

        student_subject.appendChild(
            option
        );

    });

}


if (
    student_department &&
    student_semester
) {

    student_department.addEventListener(
        "change",
        updateStudentSubjects
    );

    student_semester.addEventListener(
        "change",
        updateStudentSubjects
    );

}


// STUDENT UPLOAD

if (student_upload) {

    student_upload.addEventListener(
        "click",
        function() {

            const department =
                student_department.value;

            const semester =
                student_semester.value;

            const subject =
                student_subject.value;

            const type =
                document.querySelector(
                    "#student_type"
                ).value;

            const name =
                document.querySelector(
                    "#student_name"
                ).value;

            const file =
                document.querySelector(
                    "#student_file"
                ).files[0];


            if (
                department === "" ||
                semester === "" ||
                subject === "" ||
                type === "" ||
                name === "" ||
                !file
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }


            const formData =
                new FormData();


            formData.append(
                "department",
                department
            );

            formData.append(
                "semester",
                semester
            );

            formData.append(
                "subject",
                subject
            );

            formData.append(
                "type",
                type
            );

            formData.append(
                "name",
                name
            );

            formData.append(
                "file",
                file
            );


            fetch(
                "php/add_student_notes.php",
                {
                    method: "POST",
                    body: formData
                }
            )

            .then(response =>
                response.text()
            )

            .then(result => {

                if (
                    result.trim() ===
                    "success"
                ) {

                    alert(
                        "Resource uploaded successfully."
                    );


                    document.querySelector(
                        "#student_name"
                    ).value = "";

                    document.querySelector(
                        "#student_file"
                    ).value = "";

                }
                else {

                    alert(
                        "Upload failed."
                    );

                }

            })

            .catch(function(error) {

                console.log(
                    "Student upload error:",
                    error
                );

                alert(
                    "Upload failed."
                );

            });

        }
    );

}
// ADD EVENT

const addEventButton =
    document.querySelector("#add_event");

if (addEventButton) {

    addEventButton.addEventListener("click", function() {

        const name =
            document.querySelector("#event_name").value;

        const date =
            document.querySelector("#event_date").value;

        const description =
            document.querySelector("#event_description").value;

        if (
            name === "" ||
            date === "" ||
            description === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("date", date);
        formData.append("description", description);

        fetch("php/add_event.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {

            if (data.trim() === "success") {

                alert("Event added successfully.");

                document.querySelector("#event_name").value = "";
                document.querySelector("#event_date").value = "";
                document.querySelector("#event_description").value = "";

            }
            else {

                alert("Failed to add event.");

            }

        })
        .catch(function(error) {

            console.log("Event error:", error);

            alert("Something went wrong.");

        });

    });

}

// EVENT

const event_department =
    document.querySelector(
        "#event_department"
    );

const event_semester =
    document.querySelector(
        "#event_semester"
    );

const event_subject =
    document.querySelector(
        "#event_subject"
    );


function showEventSubjects() {

    if (!event_subject) {

        return;

    }


    event_subject.innerHTML =
        '<option value="">Select Subject</option>';


    const result =
        subjects.filter(subject =>

            subject.department ===
            event_department.value &&

            subject.semester ===
            event_semester.value

        );


    result.forEach(subject => {

        const option =
            document.createElement("option");

        option.value =
            subject.subject;

        option.innerHTML =
            subject.subject;

        event_subject.appendChild(
            option
        );

    });

}


if (
    event_department &&
    event_semester
) {

    event_department.addEventListener(
        "change",
        showEventSubjects
    );

    event_semester.addEventListener(
        "change",
        showEventSubjects
    );

}


// FACULTY CREATE ACCOUNT

const f_account =
    document.querySelector(
        "#f_account"
    );


if (f_account) {

    f_account.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.querySelector(
                    "#f_name"
                ).value;

            const username =
                document.querySelector(
                    "#f_username"
                ).value;

            const password =
                document.querySelector(
                    "#f_password"
                ).value;


            if (
                name === "" ||
                username === "" ||
                password === ""
            ) {

                alert(
                    "Please fill all the details."
                );

            }
            else {

                const formData =
                    new FormData();


                formData.append(
                    "name",
                    name
                );

                formData.append(
                    "username",
                    username
                );

                formData.append(
                    "password",
                    password
                );


                fetch(
                    "php/faculty_register.php",
                    {
                        method: "POST",
                        body: formData
                    }
                )

                .then(response =>
                    response.text()
                )

                .then(data => {

                    if (data === "success") {

                        alert(
                            "Faculty account created successfully!"
                        );

                        window.location.href =
                            "faculty_login.html";

                    }
                    else if (data === "exists") {

                        alert(
                            "Username already exists!"
                        );

                    }
                    else {

                        alert(
                            "Faculty account creation failed!"
                        );

                    }

                });

            }

        }
    );

}


// FACULTY LOGIN

const facultyLoginForm =
    document.querySelector(
        "#facultyLoginForm"
    );


if (facultyLoginForm) {

    facultyLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document.querySelector(
                    "#faculty_username"
                ).value;

            const password =
                document.querySelector(
                    "#faculty_password"
                ).value;


            if (username === "") {

                alert(
                    "Please enter username."
                );

            }
            else if (password === "") {

                alert(
                    "Please enter password."
                );

            }
            else {

                const formData =
                    new FormData();


                formData.append(
                    "username",
                    username
                );

                formData.append(
                    "password",
                    password
                );


                fetch(
                    "php/faculty_login.php",
                    {
                        method: "POST",
                        body: formData
                    }
                )

                .then(response =>
                    response.text()
                )

                .then(data => {

                    if (data === "success") {

                        window.location.href =
                            "Attendance.html";

                    }
                    else {

                        alert(
                            "Wrong username or password!"
                        );

                    }

                });

            }

        }
    );

}


// ACADEMIC ATTENDANCE

const web_attended =
    document.querySelector(
        "#web_attended"
    );

const web_total =
    document.querySelector(
        "#web_total"
    );

const web_percentage =
    document.querySelector(
        "#web_percentage"
    );


const daa_attended =
    document.querySelector(
        "#daa_attended"
    );

const daa_total =
    document.querySelector(
        "#daa_total"
    );

const daa_percentage =
    document.querySelector(
        "#daa_percentage"
    );


const cn_attended =
    document.querySelector(
        "#cn_attended"
    );

const cn_total =
    document.querySelector(
        "#cn_total"
    );

const cn_percentage =
    document.querySelector(
        "#cn_percentage"
    );


if (
    web_attended ||
    daa_attended ||
    cn_attended ||
    dashboardAttendance
) {

    fetch(
        "php/get_student_attendance.php"
    )

    .then(response => response.json())

    .then(data => {

        if (
            data.status ===
            "not_logged_in"
        ) {

            window.location.href =
                "index.html";

            return;

        }
    let totalClasses = 0;
    let totalPresent = 0;

    data.forEach(function(subject) {

        totalClasses += Number(subject.total_classes);
        totalPresent += Number(subject.present_classes);

    });

    if (dashboardAttendance) {

        if (totalClasses > 0) {

            const totalPercentage =
                (totalPresent / totalClasses) * 100;

            dashboardAttendance.innerHTML =
                totalPercentage.toFixed(1) + "%";

        }
        else {

            dashboardAttendance.innerHTML =
                "0%";

        }

    }

        data.forEach(function(subject) {

            const total =
                Number(
                    subject.total_classes
                );

            const attended =
                Number(
                    subject.present_classes
                );


            let percentage = 0;


            if (total > 0) {

                percentage =
                    (attended / total) * 100;

            }


            percentage =
                percentage.toFixed(1);


            if (
                subject.subject ===
                "Web Development"
            ) {

                if (web_attended) {

                    web_attended.innerHTML =
                        attended;

                }

                if (web_total) {

                    web_total.innerHTML =
                        total;

                }

                if (web_percentage) {

                    web_percentage.innerHTML =
                        percentage + "%";

                }

            }


            if (
                subject.subject ===
                "DAA"
            ) {

                if (daa_attended) {

                    daa_attended.innerHTML =
                        attended;

                }

                if (daa_total) {

                    daa_total.innerHTML =
                        total;

                }

                if (daa_percentage) {

                    daa_percentage.innerHTML =
                        percentage + "%";

                }

            }


            if (
                subject.subject ===
                "Computer Networks"
            ) {

                if (cn_attended) {

                    cn_attended.innerHTML =
                        attended;

                }

                if (cn_total) {

                    cn_total.innerHTML =
                        total;

                }

                if (cn_percentage) {

                    cn_percentage.innerHTML =
                        percentage + "%";

                }

            }

        });

    })

    .catch(function(error) {

        console.log(
            "Attendance error:",
            error
        );

    });

}


// STUDENT DASHBOARD - LOAD ASSIGNMENTS

function loadStudentAssignments(
    department,
    semester
) {

    const submissionSection =
        document.getElementById(
            "submission"
        );


    if (!submissionSection) {

        return;

    }


    fetch(
        "php/get_assignments.php?department=" +
        encodeURIComponent(department) +
        "&semester=" +
        encodeURIComponent(semester)
    )

    .then(response => response.json())

    .then(assignments => {

        submissionSection.innerHTML = "";


        if (assignments.length === 0) {

            submissionSection.innerHTML =
                "<p>No assignments available.</p>";

            return;

        }


        assignments.forEach(
            function(assignment) {

                const assignmentCard =
                    document.createElement("div");

                assignmentCard.className =
                    "assignment-card";


                assignmentCard.innerHTML = `
                    <h4>${assignment.assignment_name}</h4>

                    <p>
                        <strong>Subject:</strong>
                        ${assignment.subject}
                    </p>

                    <p>
                        <strong>Submission Date:</strong>
                        ${assignment.submission_date}
                    </p>

                    <p>
                        ${assignment.description}
                    </p>
                `;


                submissionSection.appendChild(
                    assignmentCard
                );

            }
        );

    })

    .catch(error => {

        console.log(
            "Error loading assignments:",
            error
        );

        submissionSection.innerHTML =
            "<p>Unable to load assignments.</p>";

    });

}


// TIME TABLE
// Currently disabled

// const tt_department =
//     document.querySelector("#tt_department");

// const tt_semester =
//     document.querySelector("#tt_semester");

// const tt_subject =
//     document.querySelector("#tt_subject");


// function showTimetableSubjects() {

//     if (!tt_subject) {
//         return;
//     }


//     tt_subject.innerHTML =
//         '<option value="">Select Subject</option>';


//     const result = subjects.filter(subject =>

//         subject.department === tt_department.value &&
//         subject.semester === tt_semester.value

//     );


//     result.forEach(subject => {

//         const option =
//             document.createElement("option");

//         option.value =
//             subject.subject;

//         option.innerHTML =
//             subject.subject;

//         tt_subject.appendChild(option);

//     });

// }


// if (tt_department && tt_semester) {

//     tt_department.addEventListener(
//         "change",
//         showTimetableSubjects
//     );

//     tt_semester.addEventListener(
//         "change",
//         showTimetableSubjects
//     );

// }