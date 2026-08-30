-- ============================================================
-- SDPD MDT - Seed Data
-- CNC111 Network and Web Programming
-- All people, badge numbers, licenses and plates are fictional.
-- ============================================================

USE sdpd_mdt;

-- ------------------------------------------------------------
-- OFFICERS
-- ------------------------------------------------------------

INSERT INTO officers
    (badge_number, name, rank, role, divsion, photo_url, username, password_hash, duty_status, duty_status_updated_at)
VALUES
    (
        '4471',
        'J. Ramirez',
        'Officer',
        'officer',
        'Patrol',
        'https://placehold.co/280',
        'jramirez',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'on_duty',
        '2026-08-30 13:42:00'
    ),
    (
        '3390',
        'K. Delgado',
        'Sergeant',
        'officer',
        'Traffic',
        'https://placehold.co/280',
        'kdelgado',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'on_duty',
        '2026-08-30 12:15:00'
    ),
    (
        '5122',
        'M. Ahn',
        'Detective',
        'officer',
        'Detective Buraeu',
        'https://placehold.co/280',
        'mahn',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'off_duty',
        '2026-08-29 22:10:00'
    ),
    (
        '2087',
        'R. Whitfield',
        'Officer',
        'officer',
        'Patrol',
        'https://placehold.co/280',
        'rwhitfield',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'on_duty',
        '2026-08-30 14:03:00'
    ),
    (
        '6654',
        'T. Nguyen',
        'Officer',
        'officer',
        'Patrol',
        'https://placehold.co/280',
        'tnguyen',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'off_duty',
        '2026-08-29 20:47:00'
    ),
    (
        '7812',
        'A. Brooks',
        'Officer',
        'officer',
        'Trafffic',
        'https://placehold.co/280',
        'abrooks',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'on_duty',
        '2026-08-30 11:38:00'
    ),
    (
        '4265',
        'D. Morales',
        'Corporal',
        'officer',
        'Traffic',
        'https://placehold.co/280',
        'dmorales',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'on_duty',
        '2026-08-30 13:21:00'
    ),
    (
        '5931',
        'S. Patel',
        'Officer',
        'officer',
        'Patrol',
        'https://placehold.co/280',
        'spatel',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llCk5h9Qp8s6t7Y8Qk1aC',
        'off_duty',
        '2026-08-30 09:56:00'
    );


-- ------------------------------------------------------------
-- INDIVIDUALS
-- ------------------------------------------------------------

INSERT INTO individuals
    (full_name, date_of_birth, gender, address, license_number, photo_url)
VALUES
    ('Marcus Bell', '1994-03-11', 'Male',
     '118 Harbor View Dr, San Diego, CA', 'D1029384', 'https://placehold.co/280'),

    ('Elena Vasquez', '1988-07-22', 'Female',
     '77 Sunset Cliffs Blvd, San Diego, CA', 'D5566778', 'https://placehold.co/280'),

    ('Tyrell Jackson', '2001-01-30', 'Male',
     '905 Ocean Front St, San Diego, CA', 'D9988112', 'https://placehold.co/280'),

    ('Sophia Carter', '1996-11-05', 'Female',
     '4312 Adams Ave, San Diego, CA', 'D3147285', 'https://placehold.co/280'),

    ('Daniel Kim', '1985-09-14', 'Male',
     '1640 Camino Del Rio N, San Diego, CA', 'D4819203', 'https://placehold.co/280'),

    ('Maya Thompson', '1999-04-27', 'Female',
     '2907 University Ave, San Diego, CA', 'D7291456', 'https://placehold.co/280'),

    ('Christopher Reed', '1979-12-19', 'Male',
     '815 Market St, San Diego, CA', 'D2083417', 'https://placehold.co/280'),

    ('Isabella Torres', '1992-06-08', 'Female',
     '3620 Clairemont Mesa Blvd, San Diego, CA', 'D6738142', 'https://placehold.co/280'),

    ('Nathan Cooper', '2003-02-16', 'Male',
     '5095 Linda Vista Rd, San Diego, CA', 'D9150274', 'https://placehold.co/280'),

    ('Alicia Morgan', '1987-10-31', 'Female',
     '1260 4th Ave, San Diego, CA', 'D5372198', 'https://placehold.co/280'),

    ('Jordan Price', '1995-01-12', 'Male',
     '2210 El Cajon Blvd, San Diego, CA', 'D6843105', 'https://placehold.co/280'),

    ('Rebecca Flores', '1990-08-23', 'Female',
     '8745 Aero Dr, San Diego, CA', 'D4127869', 'https://placehold.co/280'),

    ('Anthony Grant', '1983-05-17', 'Male',
     '1467 Imperial Ave, San Diego, CA', 'D7901543', 'https://placehold.co/280'),

    ('Hannah Lee', '1998-12-02', 'Female',
     '3002 Balboa Ave, San Diego, CA', 'D3518640', 'https://placehold.co/280'),

    ('Michael Foster', '1976-03-29', 'Male',
     '6710 Friars Rd, San Diego, CA', 'D6284901', 'https://placehold.co/280'),

    ('Kayla Bennett', '2000-09-07', 'Female',
     '4188 Mission Blvd, San Diego, CA', 'D8437152', 'https://placehold.co/280'),

    ('Brandon Scott', '1993-07-18', 'Male',
     '9525 Clairemont Mesa Blvd, San Diego, CA', 'D2659187', 'https://placehold.co/280'),

    ('Nicole Hayes', '1989-02-25', 'Female',
     '5175 College Ave, San Diego, CA', 'D7043816', 'https://placehold.co/280'),

    ('Eric Wallace', '1981-11-11', 'Male',
     '2436 30th St, San Diego, CA', 'D5982173', 'https://placehold.co/280'),

    ('Samantha Cruz', '1997-05-03', 'Female',
     '1090 Grand Ave, San Diego, CA', 'D8362049', 'https://placehold.co/280');

-- ------------------------------------------------------------
-- BOLOS
-- ------------------------------------------------------------

INSERT INTO bolos (officer_id, subject_name, plate_number, vehicle_description, reason, priority, status, issued_on) VALUES
(2, 'Unknown male, approx. 30s', '5LMN789', 'Black sedan, tinted windows', 'Suspect fled scene of armed robbery on 4th Ave', 'high', 'active', '2026-08-27 21:15:00'),
(4, NULL, '3RTY221', 'Red pickup truck, damaged rear bumper', 'Hit-and-run reported near Balboa Park', 'medium', 'active', '2026-08-28 08:40:00'),
(1, 'Tyrell Jackson', NULL, NULL, 'Wanted for questioning, outstanding warrant', 'medium', 'resolved', '2026-08-24 16:00:00');


-- ------------------------------------------------------------
-- CITATIONS
-- ------------------------------------------------------------

INSERT INTO citations
    (officer_id, individual_id, citation_type, violation, plate_number, fine_amount, location, issued_on)
VALUES
    (1, 1, 'fine',
     'Speeding 45 in a 30 zone',
     '7XYZ123', 150.00,
     'Harbor Dr & 5th Ave, San Diego, CA',
     '2026-08-20 14:32:00'),

    (4, 2, 'warning',
     'Rolling stop at intersection',
     '9ABC456', NULL,
     'Sunset Cliffs Blvd & Nimitz Blvd, San Diego, CA',
     '2026-08-22 09:10:00'),

    (6, 3, 'fine',
     'Speeding 58 in a 45 zone',
     '8LMN721', 180.00,
     'I-805 & Balboa Ave, San Diego, CA',
     '2026-08-23 16:41:00'),

    (7, 4, 'warning',
     'Failure to signal lane change',
     '6QRT884', NULL,
     'Adams Ave & 34th St, San Diego, CA',
     '2026-08-24 11:05:00'),

    (2, 5, 'fine',
     'Expired vehicle registration',
     '5HJK219', 95.00,
     'Camino Del Rio N & Qualcomm Way, San Diego, CA',
     '2026-08-24 13:27:00'),

    (8, 6, 'fine',
     'Speeding 52 in a 35 zone',
     '7PDS642', 200.00,
     'University Ave & 54th St, San Diego, CA',
     '2026-08-24 18:53:00'),

    (1, 7, 'warning',
     'Unsafe lane change',
     '4KLM803', NULL,
     'Market St & 10th Ave, San Diego, CA',
     '2026-08-25 08:14:00'),

    (4, 8, 'fine',
     'Failure to yield to pedestrian',
     '9TRV361', 120.00,
     'Clairemont Mesa Blvd & Genesee Ave, San Diego, CA',
     '2026-08-25 10:46:00'),

    (6, 9, 'warning',
     'Defective brake light',
     '3WXP517', NULL,
     'Linda Vista Rd & Ulric St, San Diego, CA',
     '2026-08-25 15:19:00'),

    (7, 10, 'fine',
     'Speeding 47 in a 35 zone',
     '7NVC229', 160.00,
     '4th Ave & A St, San Diego, CA',
     '2026-08-26 12:33:00'),

    (2, 11, 'warning',
     'Improper turn',
     '8JKE740', NULL,
     'El Cajon Blvd & Park Blvd, San Diego, CA',
     '2026-08-26 17:06:00'),

    (8, 12, 'fine',
     'Failure to stop at red signal',
     '5RFA913', 250.00,
     'Aero Dr & Kearny Villa Rd, San Diego, CA',
     '2026-08-26 21:18:00'),

    (1, 13, 'fine',
     'Speeding 64 in a 55 zone',
     '6BGT418', 175.00,
     'I-15 near Friars Rd, San Diego, CA',
     '2026-08-27 07:42:00'),

    (4, 14, 'warning',
     'Obstructed license plate',
     '7HLP552', NULL,
     'Balboa Ave & Clairemont Dr, San Diego, CA',
     '2026-08-27 09:28:00'),

    (6, 15, 'fine',
     'Illegal U-turn',
     '4MZR881', 125.00,
     'Friars Rd & Mission Center Rd, San Diego, CA',
     '2026-08-27 14:11:00'),

    (7, 16, 'fine',
     'Speeding 49 in a 35 zone',
     '8CVK304', 165.00,
     'Mission Blvd & Garnet Ave, San Diego, CA',
     '2026-08-27 19:37:00'),

    (2, 17, 'warning',
     'Failure to signal',
     '9QAS718', NULL,
     'Clairemont Mesa Blvd & Ruffin Rd, San Diego, CA',
     '2026-08-28 08:22:00'),

    (8, 18, 'fine',
     'Expired registration tabs',
     '5XDL467', 95.00,
     'College Ave & El Cajon Blvd, San Diego, CA',
     '2026-08-28 11:54:00'),

    (1, 19, 'warning',
     'Rolling stop',
     '3FNB906', NULL,
     '30th St & Upas St, San Diego, CA',
     '2026-08-28 16:03:00'),

    (4, 20, 'fine',
     'Speeding 51 in a 35 zone',
     '7KTR631', 190.00,
     'Grand Ave & Lamont St, San Diego, CA',
     '2026-08-29 13:45:00'),

    (6, 3, 'fine',
     'Failure to maintain lane',
     '8LMN721', 140.00,
     'I-805 & Nobel Dr, San Diego, CA',
     '2026-08-29 17:16:00'),

    (7, 5, 'warning',
     'Expired parking meter',
     '5HJK219', NULL,
     'Market St & 6th Ave, San Diego, CA',
     '2026-08-29 18:02:00'),

    (2, 9, 'fine',
     'Speeding 46 in a 30 zone',
     '3WXP517', 175.00,
     'Linda Vista Rd & Comstock St, San Diego, CA',
     '2026-08-29 20:31:00'),

    (8, 13, 'warning',
     'Improper parking',
     '6BGT418', NULL,
     'Imperial Ave & 15th St, San Diego, CA',
     '2026-08-30 08:17:00'),

    (1, 16, 'fine',
     'Failure to yield',
     '8CVK304', 110.00,
     'Mission Blvd & Thomas Ave, San Diego, CA',
     '2026-08-30 10:26:00');


-- ------------------------------------------------------------
-- INCIDENTS
-- ------------------------------------------------------------

INSERT INTO incidents
    (officer_id, type, description, location, status, reported_on)
VALUES
    (2, 'Traffic Collision',
     'Two-vehicle collision at intersection. One driver reported minor injuries. Fire and medical units requested.',
     'Interstate 5 & Washington St, San Diego, CA',
     'Open',
     '2026-08-25 18:45:00'),

    (1, 'Burglary',
     'Reported break-in at a commercial property. Rear door showed signs of forced entry and several electronic items were missing.',
     '220 5th Ave, San Diego, CA',
     'Closed: Cleared by Arrest',
     '2026-08-18 07:20:00'),

    (3, 'Suspicious Person',
     'Store employee reported an unknown individual repeatedly checking vehicle door handles in the parking area.',
     '1200 Harbor Island Dr, San Diego, CA',
     'Closed',
     '2026-08-26 22:14:00'),

    (4, 'Traffic Collision',
     'Rear-end collision involving three vehicles. No serious injuries reported. Traffic partially blocked.',
     'El Cajon Blvd & 36th St, San Diego, CA',
     'Closed',
     '2026-08-27 08:36:00'),

    (6, 'Theft',
     'Laptop computer reported stolen from an unlocked vehicle. Victim believes theft occurred within the previous hour.',
     '2900 University Ave, San Diego, CA',
     'Open',
     '2026-08-27 14:52:00'),

    (7, 'Disturbance',
     'Verbal dispute between two individuals outside a business. No weapons observed and parties separated on arrival.',
     '5000 Newport Ave, San Diego, CA',
     'Closed',
     '2026-08-27 20:11:00'),

    (8, 'Vandalism',
     'Several storefront windows damaged overnight. Estimated property damage approximately $3,500.',
     '4100 Adams Ave, San Diego, CA',
     'Open',
     '2026-08-28 06:47:00'),

    (1, 'Vehicle Theft',
     'Vehicle reported stolen from residential driveway during overnight hours.',
     '7000 Clairemont Mesa Blvd, San Diego, CA',
     'Open',
     '2026-08-28 09:25:00'),

    (2, 'Domestic Disturbance',
     'Neighbors reported loud argument inside residence. Officers contacted both parties and no injuries were observed.',
     '1800 Meade Ave, San Diego, CA',
     'Closed',
     '2026-08-28 19:40:00'),

    (3, 'Fraud',
     'Business owner reported several unauthorized transactions made using company payment information.',
     '900 Broadway, San Diego, CA',
     'Under Investigation',
     '2026-08-29 10:18:00'),

    (4, 'Found Property',
     'Backpack containing personal documents and electronic equipment located near a bus stop.',
     'University Ave & 5th Ave, San Diego, CA',
     'Closed',
     '2026-08-29 12:07:00'),

    (6, 'Assault',
     'Two individuals involved in a physical altercation outside a bar. One subject transported for medical evaluation.',
     '1900 Garnet Ave, San Diego, CA',
     'Open',
     '2026-08-29 23:16:00'),

    (7, 'Noise Complaint',
     'Multiple complaints received regarding loud music from residential property.',
     '3200 Mission Blvd, San Diego, CA',
     'Closed',
     '2026-08-30 00:42:00'),

    (8, 'Hit and Run',
     'Parked vehicle struck in a shopping-center lot. Suspect vehicle left the scene before officers arrived.',
     '4300 Clairemont Mesa Blvd, San Diego, CA',
     'Under Investigation',
     '2026-08-30 07:31:00'),

    (1, 'Robbery',
     'Employee reported being threatened by an individual who demanded cash before leaving the business on foot.',
     '1500 Imperial Ave, San Diego, CA',
     'Open',
     '2026-08-30 11:09:00');