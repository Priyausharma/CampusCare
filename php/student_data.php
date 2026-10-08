<?php

session_start();

include "db.php";

if (!isset($_SESSION["iu"])) {

    echo json_encode([
        "status" => "not_logged_in"
    ]);

    exit();

}

$iu = $_SESSION["iu"];

$sql = "SELECT name, iu, email, division, department, semester
        FROM students
        WHERE iu = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $iu);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 1) {

    $student = $result->fetch_assoc();

    echo json_encode($student);

}
else {

    echo json_encode([
        "status" => "error"
    ]);

}

?>