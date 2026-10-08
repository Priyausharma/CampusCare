<?php

include "db.php";

$department = $_GET["department"];
$semester = $_GET["semester"];

$sql = "SELECT iu, name
        FROM students
        WHERE department = ?
        AND semester = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ss",
    $department,
    $semester
);

$stmt->execute();

$result = $stmt->get_result();

$students = [];

while ($row = $result->fetch_assoc()) {

    $students[] = $row;

}

echo json_encode($students);

?>