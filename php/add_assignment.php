<?php

include "db.php";

$department = $_POST["department"];
$semester = $_POST["semester"];
$subject = $_POST["subject"];
$name = $_POST["name"];
$date = $_POST["date"];
$description = $_POST["description"];

$sql = "INSERT INTO assignments
(department, semester, subject, assignment_name, submission_date, description)
VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssss",
    $department,
    $semester,
    $subject,
    $name,
    $date,
    $description
);

if ($stmt->execute()) {
    echo "success";
}
else {
    echo "error";
}

?>