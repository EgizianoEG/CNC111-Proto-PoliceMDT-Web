<?php
// api/error_response.php

function respond_error(int $statusCode, string $message, array $extra = []): void
{
    http_response_code($statusCode);

    if ($statusCode === 401) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile(__DIR__ . '/../errors/401.html');
        exit;
    } else if ($statusCode === 404) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile(__DIR__ . '/../errors/404.html');
        exit;
    }

    echo json_encode(['error' => $message, ...$extra]);
    exit;
}

function respond_validation_errors(array $errors): void
{
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit;
}