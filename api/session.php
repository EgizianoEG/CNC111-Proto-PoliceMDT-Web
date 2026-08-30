<?php
// api/session.php
require 'db.php';
session_start();

if (!isset($_SESSION['officer_id'])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit;
}

echo json_encode(['authenticated' => true, 'officerId' => $_SESSION['officer_id']]);