<?php
// api/citations.php
require 'db.php';
require 'require_auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query(
        'SELECT c.id, c.citation_type, c.violation, c.plate_number, c.fine_amount,
                c.location, c.issued_on, i.full_name AS individual_name, o.name AS officer_name
         FROM citations c
         JOIN individuals i ON i.id = c.individual_id
         JOIN officers o ON o.id = c.officer_id
         ORDER BY c.issued_on DESC'
    );

    $citations = [];
    while ($row = $result->fetch_assoc()) {
        $citations[] = [
            'id' => (int) $row['id'],
            'citationType' => $row['citation_type'],
            'violation' => $row['violation'],
            'plateNumber' => $row['plate_number'],
            'fineAmount' => $row['fine_amount'] !== null ? (float) $row['fine_amount'] : null,
            'location' => $row['location'],
            'issuedOn' => $row['issued_on'],
            'individualName' => $row['individual_name'],
            'officerName' => $row['officer_name'],
        ];
    }

    echo json_encode($citations);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $officerId = (int) ($input['officerId'] ?? 0);
    $individualName = trim($input['individualName'] ?? '');
    $citationType = trim($input['citationType'] ?? '');
    $violation = trim($input['violation'] ?? '');
    $plateNumber = trim($input['plateNumber'] ?? '');
    $fineAmount = $input['fineAmount'] ?? null;
    $location = trim($input['location'] ?? '');

    $errors = [];

    if ($officerId <= 0) {
        $errors[] = 'A valid officer is required.';
    }
    if ($individualName === '') {
        $errors[] = 'Individual name is required.';
    }
    if (!in_array($citationType, ['warning', 'fine'], true)) {
        $errors[] = 'Citation type must be warning or fine.';
    }
    if ($violation === '') {
        $errors[] = 'Violation description is required.';
    }
    if ($plateNumber !== '' && !preg_match('/^[A-Z0-9]{2,10}$/i', $plateNumber)) {
        $errors[] = 'Plate number format is invalid.';
    }
    if ($citationType === 'fine' && (!is_numeric($fineAmount) || $fineAmount <= 0)) {
        $errors[] = 'Fine amount is required and must be a positive number for a fine.';
    }

    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $stmt = $conn->prepare('SELECT id FROM individuals WHERE full_name = ?');
    $stmt->bind_param('s', $individualName);
    $stmt->execute();
    $existing = $stmt->get_result()->fetch_assoc();

    if ($existing) {
        $individualId = (int) $existing['id'];
    } else {
        $stmt = $conn->prepare('INSERT INTO individuals (full_name) VALUES (?)');
        $stmt->bind_param('s', $individualName);
        $stmt->execute();
        $individualId = $conn->insert_id;
    }

    $stmt = $conn->prepare(
        'INSERT INTO citations (officer_id, individual_id, citation_type, violation, plate_number, fine_amount, location)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $fineAmountOrNull = $citationType === 'fine' ? $fineAmount : null;
    $stmt->bind_param(
        'iisssds',
        $officerId,
        $individualId,
        $citationType,
        $violation,
        $plateNumber,
        $fineAmountOrNull,
        $location
    );
    $stmt->execute();

    echo json_encode(['success' => true, 'citationId' => $conn->insert_id]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);