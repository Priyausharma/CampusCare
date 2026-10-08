<?php

session_start();

include "db.php";

$iu = $_POST["iu"];
$password = $_POST["password"];

$sql = "SELECT * FROM students WHERE iu = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $iu);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 1) {

    $student = $result->fetch_assoc();

    if (password_verify($password, $student["password"])) {

        $_SESSION["iu"] = $student["iu"];

        echo "success";

    }
    else {

        echo "wrong";

    }

}
else {

    echo "wrong";

}

?>