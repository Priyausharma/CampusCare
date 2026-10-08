<?php

include "db.php";

$department = $_GET["department"];
$semester = $_GET["semester"];
$type = $_GET["type"];

$sql = "SELECT * FROM notes
        WHERE department = ?
        AND semester = ?
        AND type = ?
        ORDER BY id DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $department,
    $semester,
    $type
);

$stmt->execute();

$result = $stmt->get_result();

$notes = [];

while ($row = $result->fetch_assoc()) {

    $notes[] = $row;

}

echo json_encode($notes);

?>