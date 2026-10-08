<?php

session_start();

include "db.php";

$username = $_POST["username"];
$password = $_POST["password"];

$sql = "SELECT * FROM faculty WHERE username = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $username);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 1) {

    $faculty = $result->fetch_assoc();

    if (password_verify($password, $faculty["password"])) {

        $_SESSION["faculty_username"] = $faculty["username"];

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