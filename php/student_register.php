<?php

include "db.php";

$name = $_POST["name"];
$iu = $_POST["iu"];
$email = $_POST["email"];
$division = $_POST["division"];
$department = $_POST["department"];
$semester = $_POST["semester"];
$password = $_POST["password"];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO students
(name, iu, email, division, department, semester, password)
VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssssss",
    $name,
    $iu,
    $email,
    $division,
    $department,
    $semester,
    $password
);

if ($stmt->execute()) {

    echo "success";

}
else {

    if ($stmt->errno == 1062) {

        echo "exists";

    }
    else {

        echo "error";

    }

}

?>