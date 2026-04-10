<?php
// Database connection for Tic Tac Toe
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'tic_tac_toe';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>