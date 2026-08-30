<?php
// api/incidents.php
require 'db.php';
require 'require_auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query(
        'SELECT i.id, i.type, i.description, i.location, i.status, i.reported_on, o.name AS officer_name
         FROM incidents i
         JOIN officers o ON o.id = i.officer_id
         ORDER BY i.reported_on DESC'
    );

    $incidents = [];
    while ($row = $result->fetch_assoc()) {
        $incidents[] = [
            'id' => (int) $row['id'],
            'type' => $row['type'],
            'description' => $row['description'],
            'location' => $row['location'],
            'status' => $row['status'],
            'reportedOn' => $row['reported_on'],
            'officerName' => $row['officer_name'],
        ];
    }

    echo json_encode($incidents);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $officerId = (int) ($input['officerId'] ?? 0);
    $type = trim($input['type'] ?? '');
    $description = trim($input['description'] ?? '');
    $location = trim($input['location'] ?? '');

    $errors = [];
    if ($officerId <= 0)
        $errors[] = 'A valid officer is required.';
    if ($type === '')
        $errors[] = 'Incident type is required.';
    if ($description === '')
        $errors[] = 'Description is required.';

    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $stmt = $conn->prepare(
        'INSERT INTO incidents (officer_id, type, description, location) VALUES (?, ?, ?, ?)'
    );

    $stmt->bind_param('isss', $officerId, $type, $description, $location);
    $stmt->execute();

    echo json_encode(['success' => true, 'incidentId' => $conn->insert_id]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);