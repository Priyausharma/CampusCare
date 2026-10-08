
<?php

include "db.php";

$department = $_GET["department"];
$semester = $_GET["semester"];

$sql = "SELECT * FROM assignments
        WHERE department = ?
        AND semester = ?
        ORDER BY submission_date ASC";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ss",
    $department,
    $semester
);

$stmt->execute();

$result = $stmt->get_result();

$assignments = [];

while ($row = $result->fetch_assoc()) {
    $assignments[] = $row;
}

echo json_encode($assignments);

?>