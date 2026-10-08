<?php

$conn = new mysqli("localhost", "root", "", "campuscare");

if ($conn->connect_error) {
    die("Database connection failed");
}

?>