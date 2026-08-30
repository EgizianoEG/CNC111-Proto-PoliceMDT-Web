<?php
// api/login.php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

if ($username === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Badge/username and password are required.']);
    exit;
}

$isBadgeNumber = ctype_digit($username);
if ($isBadgeNumber) {
    // Search by badge_number
    $stmt = $conn->prepare('SELECT id, name, badge_number, rank, division, photo_url, password_hash, duty_status, duty_status_updated_at FROM officers WHERE badge_number = ?');
    $stmt->bind_param('s', $username);
} else {
    // Search by username
    $stmt = $conn->prepare('SELECT id, name, badge_number, rank, division, photo_url, password_hash, duty_status, duty_status_updated_at FROM officers WHERE username = ?');
    $stmt->bind_param('s', $username);
}

$stmt->execute();
$officer = $stmt->get_result()->fetch_assoc();

if (!$officer || !password_verify($password, $officer['password_hash'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid badge number or password.']);
    exit;
}

session_start();
$_SESSION['officer_id'] = $officer['id'];

echo json_encode([
    'success' => true,
    'officer' => [
        'id' => (int) $officer['id'],
        'name' => $officer['name'],
        'badgeNumber' => $officer['badge_number'],
        'rank' => $officer['rank'],
        'division' => $officer['division'],
        'photoUrl' => $officer['photo_url'],
        'dutyStatus' => $officer['duty_status'] ?? 'off_duty',
        'dutyStatusLastUpdated' => $officer['duty_status_updated_at'] ?? null,
    ],
]);
