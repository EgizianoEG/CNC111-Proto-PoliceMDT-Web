<?php
// api/bolos.php
require 'db.php';
require 'require_auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $status = trim($_GET['status'] ?? '');

    $sql = 'SELECT b.id, b.subject_name, b.plate_number, b.vehicle_description, b.reason,
                   b.priority, b.status, b.issued_on, o.name AS officer_name
            FROM bolos b
            JOIN officers o ON o.id = b.officer_id';

    if ($status !== '') {
        $sql .= ' WHERE b.status = ?';
    }
    $sql .= ' ORDER BY FIELD(b.priority, \'high\', \'medium\', \'low\'), b.issued_on DESC';

    $stmt = $conn->prepare($sql);
    if ($status !== '') {
        $stmt->bind_param('s', $status);
    }
    $stmt->execute();
    $rows = $stmt->get_result();

    $bolos = [];
    while ($row = $rows->fetch_assoc()) {
        $bolos[] = [
            'id' => (int) $row['id'],
            'subjectName' => $row['subject_name'],
            'plateNumber' => $row['plate_number'],
            'vehicleDescription' => $row['vehicle_description'],
            'reason' => $row['reason'],
            'priority' => $row['priority'],
            'status' => $row['status'],
            'issuedOn' => $row['issued_on'],
            'officerName' => $row['officer_name'],
        ];
    }

    echo json_encode($bolos);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $officerId = (int) ($input['officerId'] ?? 0);
    $subjectName = trim($input['subjectName'] ?? '');
    $plateNumber = trim($input['plateNumber'] ?? '');
    $vehicleDescription = trim($input['vehicleDescription'] ?? '');
    $reason = trim($input['reason'] ?? '');
    $priority = trim($input['priority'] ?? 'medium');

    $errors = [];

    if ($officerId <= 0) {
        $errors[] = 'A valid officer is required.';
    }
    if ($subjectName === '' && $plateNumber === '') {
        $errors[] = 'Provide at least a subject name or a plate number.';
    }
    if ($plateNumber !== '' && !preg_match('/^[A-Z0-9]{2,10}$/i', $plateNumber)) {
        $errors[] = 'Plate number format is invalid.';
    }
    if ($reason === '') {
        $errors[] = 'A reason for the BOLO is required.';
    }
    if (!in_array($priority, ['low', 'medium', 'high'], true)) {
        $errors[] = 'Priority must be low, medium, or high.';
    }

    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $stmt = $conn->prepare(
        'INSERT INTO bolos (officer_id, subject_name, plate_number, vehicle_description, reason, priority)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $subjectNameOrNull = $subjectName !== '' ? $subjectName : null;
    $plateNumberOrNull = $plateNumber !== '' ? $plateNumber : null;
    $vehicleDescOrNull = $vehicleDescription !== '' ? $vehicleDescription : null;

    $stmt->bind_param(
        'isssss',
        $officerId,
        $subjectNameOrNull,
        $plateNumberOrNull,
        $vehicleDescOrNull,
        $reason,
        $priority
    );
    $stmt->execute();

    echo json_encode(['success' => true, 'boloId' => $conn->insert_id]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);