<?php

include "db.php";

$name = $_POST["name"];
$username = $_POST["username"];
$password = $_POST["password"];

$password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO faculty
(name, username, password)
VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $name,
    $username,
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