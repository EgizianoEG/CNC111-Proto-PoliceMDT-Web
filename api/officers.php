<?php
// api/officers.php
require 'db.php';
require 'require_auth.php';

$action = $_GET['action'] ?? 'roster';

if ($action === 'roster') {
    $result = $conn->query(
        'SELECT id, badge_number, name, rank, division, duty_status, photo_url FROM officers ORDER BY name'
    );

    $officers = [];
    while ($row = $result->fetch_assoc()) {
        $officers[] = [
            'id' => (int) $row['id'],
            'badgeNumber' => $row['badge_number'],
            'name' => $row['name'],
            'rank' => $row['rank'],
            'division' => $row['division'],
            'dutyStatus' => $row['duty_status'],
            'photoUrl' => $row['photo_url'],
        ];
    }

    echo json_encode($officers);
    exit;
}

if ($action === 'stats') {
    $officerId = (int) $_SESSION['officer_id'];
    $stats = [];

    $stmt = $conn->prepare('SELECT COUNT(*) AS c FROM citations WHERE officer_id = ?');
    $stmt->bind_param('i', $officerId);
    $stmt->execute();
    $stats['citationsFiled'] = (int) $stmt->get_result()->fetch_assoc()['c'];

    $stats['openIncidents'] = (int) $conn->query("SELECT COUNT(*) AS c FROM incidents WHERE status = 'Open'")->fetch_assoc()['c'];
    $stats['officersOnDuty'] = (int) $conn->query("SELECT COUNT(*) AS c FROM officers WHERE duty_status = 'on_duty'")->fetch_assoc()['c'];
    $stats['activeBolos'] = (int) $conn->query("SELECT COUNT(*) AS c FROM bolos WHERE status = 'active'")->fetch_assoc()['c'];

    echo json_encode($stats);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Unknown action']);