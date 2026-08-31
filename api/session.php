<?php
// api/session.php
require 'db.php';
session_start();

if (!isset($_SESSION['officer_id'])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit;
}

$stmt = $conn->prepare('SELECT id, name, badge_number, rank, division, photo_url, duty_status FROM officers WHERE id = ?');
$stmt->bind_param('i', $_SESSION['officer_id']);
$stmt->execute();
$officer = $stmt->get_result()->fetch_assoc();

echo json_encode([
    'authenticated' => true,
    'officer' => [
        'id' => (int) $officer['id'],
        'name' => $officer['name'],
        'badgeNumber' => $officer['badge_number'],
        'rank' => $officer['rank'],
        'division' => $officer['division'],
        'photoUrl' => $officer['photo_url'],
        'dutyStatus' => $officer['duty_status'],
    ],
]);