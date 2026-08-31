# Phase II Notes

This is an addendum to the Phase I documentation, covering what was added in Phase II: the server side, the database, and the AJAX-driven pages built on top of them.

## What this project is

This is a proof of concept, not a finished product. The goal was to demonstrate the techniques the course covers, HTML, CSS, JavaScript, DOM manipulation, form validation, AJAX with JSON, a PHP server side, and a MySQL database, working together in one coherent, believable app, not to ship a complete or polished MDT. Some features that a real MDT would have are intentionally left out or disabled, and that is a scope decision, not an oversight.

## Stack decisions

- **PHP instead of ASP.NET.** The course gave ASP.NET a brief overview with no dedicated lab. PHP was chosen because its syntax is close to JavaScript and Node, which meant faster, more confident implementation in the time available. The rubric allows either.
- **MySQL instead of SQLite.** The earlier draft of this documentation mentioned SQLite. That changed once XAMPP was set up, since MySQL is what the course lectures actually referenced, and phpMyAdmin makes the data easy to inspect and reset.
- **JSON, not XML.** The rubric allows either for the AJAX section. JSON was the natural fit given prior familiarity with it, and XML was not something this project needed to demonstrate to satisfy that requirement.

## Database

Four tables ended up implemented instead of the full seven originally sketched in the Phase I architecture document: `officers`, `individuals`, `citations`, `incidents`, plus `bolos`, added during Phase II. Each has real foreign keys, indexes, and was seeded with fictional demo data through `assets/data/schema.sql` and `assets/data/seed.sql`.

`arrests` and its related junction tables (`arrest_charges`, `incident_parties`, `incident_officers`) were designed in the original ERD (Entity-Relationship Diagram) but not implemented. Adding them would mean one more table, one more junction table, and one more full page following the same pattern already used for citations, incidents, and BOLOs. The pattern is proven, it just was not built out a third and fourth time in the time available.

## Pages and what they do

- **login.html**,  real authentication against the database, bcrypt password verification, session creation. Redirects to the dashboard automatically if a session already exists.
- **dashboard.html**,  live stats (citations filed by the logged in officer, open incidents, officers on duty, active BOLOs) and a live active BOLOs table, all loaded through AJAX.
- **roster.html**,  live officer list from the database, auto-refreshing every 60 seconds.
- **bolos.html**,  list and file BOLOs, full client and server side validation.
- **incidents.html**,  list and file incident reports, full client and server side validation.
- **lookup.html**,  search individuals and incident reports by keyword, live AJAX results including photos. Vehicle plate, citation, and arrest lookup are visibly present in the form but disabled, since the underlying search logic for those categories was not built out.
- **citations.html**,  not implemented. The server side endpoint (`api/citations.php`) exists and works, handling both listing and filing a citation with the same validation approach as incidents and BOLOs. The page that would call it was not written.

## Known limitations, and what closing them would take

- **No citations page.** The backend is done. The frontend would be a direct copy of the incidents or BOLOs page pattern, a list plus a form, maybe thirty to sixty minutes of work given the existing pattern.
- **Arrests not implemented**, front end or back end. Designed in the ERD, not built.
- **Federal/local database filter is disabled.** It was going to be a flag on individual records rather than a second real database, but was disabled rather than half-implemented.

None of these are bugs. They are the edge of where the scope was deliberately drawn given the time available, and each one is a small, well understood next step rather than an open question.
