<?php
// api/db.php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'sdpd_mdt';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$conn->set_charset('utf8mb4');