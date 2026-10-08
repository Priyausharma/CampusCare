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


$sql = "SELECT
            subject,
            COUNT(*) AS total_classes,
            SUM(status = 'Present') AS present_classes
        FROM attendance
        WHERE iu = ?
        GROUP BY subject";


$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $iu);

$stmt->execute();

$result = $stmt->get_result();


$attendance = [];


while ($row = $result->fetch_assoc()) {

    $attendance[] = $row;

}


echo json_encode($attendance);

?>