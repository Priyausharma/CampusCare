<?php

include "db.php";

$name = $_POST["name"];
$date = $_POST["date"];
$description = $_POST["description"];

$sql = "INSERT INTO events
(name, event_date, description)
VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
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