<?php

include "db.php";

$department = $_POST["department"];
$semester = $_POST["semester"];
$subject = $_POST["subject"];
$name = $_POST["name"];
$type = $_POST["type"];

$file_name = $_FILES["file"]["name"];

$folder = "../uploads/";

if (!is_dir($folder)) {
    mkdir($folder);
}

move_uploaded_file(
    $_FILES["file"]["tmp_name"],
    $folder . $file_name
);

$sql = "INSERT INTO notes 
(department, semester, subject, type, name, file_name)
VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssss",
    $department,
    $semester,
    $subject,
    $type,
    $name,
    $file_name
);

if ($stmt->execute()) {
    echo "success";
}
else {
    echo "error";
}

?>