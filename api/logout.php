<?php
// api/logout.php
require 'db.php';
session_start();

$_SESSION = [];
session_destroy();

echo json_encode(['success' => true]);