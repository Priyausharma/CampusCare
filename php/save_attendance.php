<?php

include "db.php";

$iu = $_POST["iu"] ?? "";
$department = $_POST["department"] ?? "";
$semester = $_POST["semester"] ?? "";
$subject = $_POST["subject"] ?? "";
$date = $_POST["date"] ?? "";
$status = $_POST["status"] ?? "";


if (
    $iu == "" ||
    $department == "" ||
    $semester == "" ||
    $subject == "" ||
    $date == "" ||
    $status == ""
) {

    echo "Missing data";

    exit();

}


/*
    First check whether attendance
    already exists for this student,
    subject and date.
*/

$check_sql = "SELECT id
              FROM attendance
              WHERE iu = ?
              AND subject = ?
              AND attendance_date = ?";


$check_stmt = $conn->prepare($check_sql);


$check_stmt->bind_param(
    "sss",
    $iu,
    $subject,
    $date
);


$check_stmt->execute();

$check_result = $check_stmt->get_result();


/*
    If attendance already exists,
    update it.
*/

if ($check_result->num_rows > 0) {

    $row = $check_result->fetch_assoc();

    $id = $row["id"];


    $update_sql = "UPDATE attendance
                   SET department = ?,
                       semester = ?,
                       status = ?
                   WHERE id = ?";


    $update_stmt =
        $conn->prepare($update_sql);


    $update_stmt->bind_param(
        "sssi",
        $department,
        $semester,
        $status,
        $id
    );


    if ($update_stmt->execute()) {

        echo "success";

    }
    else {

        echo "Database error: "
             . $update_stmt->error;

    }

}


/*
    If attendance does not exist,
    create a new record.
*/

else {

    $insert_sql = "INSERT INTO attendance
                   (
                       iu,
                       department,
                       semester,
                       subject,
                       attendance_date,
                       status
                   )
                   VALUES (?, ?, ?, ?, ?, ?)";


    $insert_stmt =
        $conn->prepare($insert_sql);


    $insert_stmt->bind_param(
        "ssssss",
        $iu,
        $department,
        $semester,
        $subject,
        $date,
        $status
    );


    if ($insert_stmt->execute()) {

        echo "success";

    }
    else {

        echo "Database error: "
             . $insert_stmt->error;

    }

}

?>