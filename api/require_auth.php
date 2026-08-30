<?php
// api/require_auth.php
require 'error_response.php';

session_start();

if (!isset($_SESSION['officer_id'])) {
    respond_error(401, 'Not authenticated. Please log in.');
}