<?php
// api/lookup.php
require 'db.php';
require 'require_auth.php';

$category = trim($_GET['category'] ?? 'individuals');
$query = trim($_GET['q'] ?? '');

$allowedCategories = ['individuals', 'vehicles', 'citations', 'incidents', 'bolos'];

if (!in_array($category, $allowedCategories, true)) {
    respond_error(400, 'Unknown lookup category.');
}

if ($query === '' || mb_strlen($query) < 2) {
    respond_error(422, 'Search term must be at least 2 characters.');
}

$results = [];

switch ($category) {
    case 'individuals':
        $stmt = $conn->prepare(
            'SELECT id, full_name, date_of_birth, gender, address, license_number, photo_url
             FROM individuals
             WHERE full_name LIKE CONCAT(\'%\', ?, \'%\')
             ORDER BY full_name
             LIMIT 25'
        );
        $stmt->bind_param('s', $query);
        $stmt->execute();
        $rows = $stmt->get_result();
        while ($row = $rows->fetch_assoc()) {
            $results[] = [
                'id' => (int) $row['id'],
                'fullName' => $row['full_name'],
                'dateOfBirth' => $row['date_of_birth'],
                'gender' => $row['gender'],
                'address' => $row['address'],
                'licenseNumber' => $row['license_number'],
                'photoUrl' => $row['photo_url'],
            ];
        }
        break;

    case 'vehicles':
        $stmt = $conn->prepare(
            'SELECT DISTINCT plate_number, individual_id
             FROM citations
             WHERE plate_number LIKE CONCAT(\'%\', ?, \'%\')
             LIMIT 25'
        );
        $stmt->bind_param('s', $query);
        $stmt->execute();
        $rows = $stmt->get_result();
        while ($row = $rows->fetch_assoc()) {
            $results[] = [
                'plateNumber' => $row['plate_number'],
                'individualId' => (int) $row['individual_id'],
            ];
        }
        break;

    case 'citations':
        $stmt = $conn->prepare(
            'SELECT c.id, c.citation_type, c.violation, c.plate_number, c.issued_on, i.full_name AS individual_name
             FROM citations c
             JOIN individuals i ON i.id = c.individual_id
             WHERE i.full_name LIKE CONCAT(\'%\', ?, \'%\') OR c.plate_number LIKE CONCAT(\'%\', ?, \'%\')
             ORDER BY c.issued_on DESC
             LIMIT 25'
        );
        $stmt->bind_param('ss', $query, $query);
        $stmt->execute();
        $rows = $stmt->get_result();
        while ($row = $rows->fetch_assoc()) {
            $results[] = [
                'id' => (int) $row['id'],
                'citationType' => $row['citation_type'],
                'violation' => $row['violation'],
                'plateNumber' => $row['plate_number'],
                'issuedOn' => $row['issued_on'],
                'individualName' => $row['individual_name'],
            ];
        }
        break;

    case 'incidents':
        $stmt = $conn->prepare(
            'SELECT id, type, description, status, reported_on
             FROM incidents
             WHERE type LIKE CONCAT(\'%\', ?, \'%\') OR description LIKE CONCAT(\'%\', ?, \'%\')
             ORDER BY reported_on DESC
             LIMIT 25'
        );
        $stmt->bind_param('ss', $query, $query);
        $stmt->execute();
        $rows = $stmt->get_result();
        while ($row = $rows->fetch_assoc()) {
            $results[] = [
                'id' => (int) $row['id'],
                'type' => $row['type'],
                'description' => $row['description'],
                'status' => $row['status'],
                'reportedOn' => $row['reported_on'],
            ];
        }
        break;

    case 'bolos':
        $stmt = $conn->prepare(
            'SELECT id, subject_name, plate_number, vehicle_description, reason, priority, status, issued_on
             FROM bolos
             WHERE subject_name LIKE CONCAT(\'%\', ?, \'%\') OR plate_number LIKE CONCAT(\'%\', ?, \'%\')
             ORDER BY issued_on DESC
             LIMIT 25'
        );
        $stmt->bind_param('ss', $query, $query);
        $stmt->execute();
        $rows = $stmt->get_result();
        while ($row = $rows->fetch_assoc()) {
            $results[] = [
                'id' => (int) $row['id'],
                'subjectName' => $row['subject_name'],
                'plateNumber' => $row['plate_number'],
                'vehicleDescription' => $row['vehicle_description'],
                'reason' => $row['reason'],
                'priority' => $row['priority'],
                'status' => $row['status'],
                'issuedOn' => $row['issued_on'],
            ];
        }
        break;
}

echo json_encode(['category' => $category, 'query' => $query, 'results' => $results]);