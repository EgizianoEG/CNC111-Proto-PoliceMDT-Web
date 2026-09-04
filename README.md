# SDPD MDT

A small, fictional Mobile Data Terminal for a roleplay police department, built as a project for CNC111 (Network and Web Programming).

Officers log in, look up records, file incident reports and BOLOs, and check who's on shift. It's not affiliated with the real San Diego Police Department, just borrowing the name and look for a bit of realism.

## Status

Phase two. The front end is wired to a real PHP and MySQL backend: login, session-based access control, and most pages are fully live. This is a proof of concept demonstrating the course's front end and back end techniques together, not a complete or polished MDT. See `PHASE_II_NOTES.md` for what's implemented versus what's designed but not built.

## Pages so far

- `login.html`, real authentication against the database, session-based
- `dashboard.html`, live stats and active BOLOs, pulled via AJAX
- `lookup.html`, live search for individuals and incident reports, other categories visible but disabled
- `incidents.html`, list and file incident reports, validated client and server side
- `bolos.html`, list and file BOLOs, validated client and server side
- `roster.html`, live officer list, auto-refreshing
- `citations.html`, not yet built; the backend endpoint exists and works, see [PHASE_II_NOTES](./PHASE_II_NOTES.md) for details

## Setup

Needs XAMPP (or an equivalent Apache + PHP + MySQL stack) running locally. Create a database, then import `assets/data/schema.sql` followed by `assets/data/seed.sql` through phpMyAdmin.

## Docs

More detail lives in `ARCHITECTURE.md`, `CODE_STANDARD.md`, and `PHASE_II_NOTES.md`, if you're curious or picking this up later.

# SDPD MDT

A small, fictional Mobile Data Terminal for a roleplay police department, built as a project for CNC111 (Network and Web Programming) at E-JUST.

Officers log in, look up records, file incident reports and BOLOs, and check who's on shift. It's not affiliated with the real San Diego Police Department, just borrowing the name and look for a bit of realism.

## Status

Phase two. The front end is wired to a real PHP and MySQL backend: login, session-based access control, and most pages are fully live. This is a proof of concept demonstrating the course's front end and back end techniques together, not a complete or polished MDT. See `PHASE_II_NOTES.md` for what's implemented versus what's designed but not built.

## Pages so far

- `login.html`, real authentication against the database, session-based
- `dashboard.html`, live stats and active BOLOs, pulled via AJAX
- `lookup.html`, live search for individuals and incident reports, other categories visible but disabled
- `incidents.html`, list and file incident reports, validated client and server side
- `bolos.html`, list and file BOLOs, validated client and server side
- `roster.html`, live officer list, auto-refreshing
- `citations.html`, not yet built; the backend endpoint exists and works, see [PHASE_II_NOTES](./PHASE_II_NOTES.md) for details

## Setup

Needs XAMPP (or an equivalent Apache + PHP + MySQL stack) running locally. Create a database, then import `assets/data/schema.sql` followed by `assets/data/seed.sql` through phpMyAdmin.

## Docs

More detail lives in `ARCHITECTURE.md`, `CODE_STANDARD.md`, and `PHASE_II_NOTES.md`, if you're curious or picking this up later.

## Related Work

This project’s feature set (records lookup, citations, arrests, incident reports, duty roster) was informed by looking at how existing Mobile Data Terminal (MDT) and Computer-Aided Dispatch (CAD) systems are structured, from real law enforcement platforms down to community-built roleplay tools; it is an independent academic exercise for CNC111 and is not affiliated with, endorsed by, or derived from the code or assets of any of them.

- [Motorola Solutions Flex CAD](https://www.motorolasolutions.com/en_us/products/):
command-center-software/public-safety-software/flex/spillman-cad.html (formerly
Spillman Flex): a CAD, RMS, Mobile, and Jail Management suite used by over 1,000 U.S.
public safety agencies.
- [Eleven Project - Police MDT CAD](https://elevenproject.eu/en/store/police-mdt/):
a commercial MDT/CAD tablet for QBCore FiveM servers, covering civil records, warrants,
dispatch, radio, and vehicle impound.
- [SnailyCAD](https://snailycad.org/): a free, open-source, self-hosted CAD/MDT system
for FiveM, closer in scale and structure to this project than the two above.
