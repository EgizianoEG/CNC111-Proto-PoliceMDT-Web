-- ============================================================
-- SDPD MDT - Database Schema
-- CNC111 Network and Web Programming
-- Fictional roleplay project
-- ============================================================

CREATE DATABASE IF NOT EXISTS sdpd_mdt
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE sdpd_mdt;

-- ------------------------------------------------------------
-- OFFICERS
-- ------------------------------------------------------------

CREATE TABLE officers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    badge_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'officer',
    division VARCHAR(50) NULL,
    photo_url VARCHAR(255) NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    duty_status VARCHAR(20) NOT NULL DEFAULT 'off_duty',
    duty_status_updated_at DATETIME NULL,

    INDEX idx_officers_duty_status (duty_status)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- INDIVIDUALS
-- ------------------------------------------------------------

CREATE TABLE individuals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NULL,
    gender VARCHAR(20) NULL,
    address VARCHAR(255) NULL,
    license_number VARCHAR(50) NULL,
    photo_url VARCHAR(255) NULL,

    INDEX idx_individuals_name (full_name),
    INDEX idx_individuals_license (license_number)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- BOLOS
-- ------------------------------------------------------------

CREATE TABLE bolos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    officer_id INT NOT NULL,
    subject_name VARCHAR(100) NULL,
    plate_number VARCHAR(20) NULL,
    vehicle_description VARCHAR(255) NULL,
    reason VARCHAR(255) NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    issued_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bolos_officer
        FOREIGN KEY (officer_id)
        REFERENCES officers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_bolos_status (status),
    INDEX idx_bolos_priority (priority),
    INDEX idx_bolos_issued_on (issued_on)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- CITATIONS
-- ------------------------------------------------------------

CREATE TABLE citations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    officer_id INT NOT NULL,
    individual_id INT NOT NULL,
    citation_type VARCHAR(20) NOT NULL,
    violation VARCHAR(255) NOT NULL,
    plate_number VARCHAR(20) NULL,
    fine_amount DECIMAL(8,2) NULL,
    location VARCHAR(255) NULL,
    issued_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_citations_officer
        FOREIGN KEY (officer_id)
        REFERENCES officers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_citations_individual
        FOREIGN KEY (individual_id)
        REFERENCES individuals(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_citations_officer (officer_id),
    INDEX idx_citations_individual (individual_id),
    INDEX idx_citations_issued_on (issued_on)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- INCIDENTS
-- ------------------------------------------------------------

CREATE TABLE incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    officer_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NULL,
    location VARCHAR(255) NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Open',
    reported_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_incidents_officer
        FOREIGN KEY (officer_id)
        REFERENCES officers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_incidents_officer (officer_id),
    INDEX idx_incidents_status (status),
    INDEX idx_incidents_reported_on (reported_on)
) ENGINE=InnoDB;