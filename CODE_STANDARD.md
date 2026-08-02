# Code Standard

This document lists the conventions followed across the project. The goal is that any page, stylesheet, or script looks like it was written by the same person, and that a new page can be added just by following the pattern already set by the existing ones.

## General

- Files and folders use kebab case, for example `login.html` and `manage-officers.html`.
- Every feature gets its own folder under `src/features/`.
- Every page has a matching CSS file under `assets/styles/` with the same base name, for example `citations.html` pairs with `citations.css`.
- Formatting is handled by Prettier and linting by ESLint. Run the formatter and linter before committing rather than relying on manual review.
- Commits should be small and describe one change, for example "add citations form markup" rather than one large commit at the end of a session.

## HTML

- Use lowercase tags and attributes, and always quote attribute values.
- Use semantic landmarks on every page: `header`, `nav`, `main`, and `footer` where it applies. Do not use a generic `div` where a semantic tag already fits.
- Every page needs one `h1` describing what the page is, plus a `title` tag and a short `meta description`.
- Class names follow BEM style, block, then element with two underscores, then modifier with two dashes. For example `stat-card`, `stat-card__value`, and `sidebar__link--active`.
- Keep one id per page reserved for something that is truly unique, such as the login button or the main form. Do not use ids for general styling hooks, use classes instead.
- Never write JavaScript directly in the HTML. No `onclick`, no inline `<script>` blocks with logic in them. All behavior lives in a separate `.js` file and is attached with `addEventListener`. This is the unobtrusive JavaScript rule and it applies to every page, not just the ones with forms.
- Add a short HTML comment above any large or repeated block, for example `<!-- citation form -->`, so the structure is easy to scan.
- Every form field has a matching `label` with a `for` attribute pointing at the input `id`. Do not rely on placeholder text alone as a label.

## CSS

- `base.css` holds only things shared across the whole site: color variables, font variables, resets, and small shared components like `.btn`.
- `shell.css` holds only the shared top bar and sidebar, since those repeat on every page after login.
- Each page's own CSS file holds only styles for that page's content. If a style is needed on more than one page, move it into `base.css` or `shell.css` instead of copying it.
- Use the CSS variables already defined in `base.css` for color and spacing, for example `var(--color-navy)`, instead of writing a new hex value inline.
- Selectors should mix element, class, id, and combinator selectors naturally rather than using only one kind everywhere. A combinator like `.form-field input` is preferred over adding a new class to every single input.
- Avoid `!important`. If a style is not applying, the fix is almost always a more specific selector, not a forced override.
- One responsive breakpoint is used across the project, `max-width: 700px`, so behavior stays predictable. Only add a second breakpoint if a specific page genuinely needs it, and explain why in a comment.
- ~~Floats are used deliberately in places like the dashboard sidebar layout, and any floated element must have a matching clearfix or an `overflow` rule on its parent so the layout does not break.~~

## JavaScript, phase two

- Plain JavaScript, ES6 and later. No frameworks or build step (hopefully).
- One file per feature, matching the page it belongs to, for example `citations.js` handles behavior for `citations.html` only.
- `main.js` in `assets/scripts/` is reserved for logic shared across pages, such as loading the shared shell or formatting a date the same way everywhere.
- Functions are small and named for what they do, for example `loadCitations()` or `validatePlateNumber()`, rather than one large function doing several things.
- All DOM lookups happen through `document.querySelector` or `document.querySelectorAll`, kept near the top of the file or the function that uses them, rather than repeated inline.
- All event handling uses `addEventListener`, never inline handlers in the HTML.
- Variables use camel case, for example `officerName`, `citationList`.

## AJAX and data, phase two

- Requests use `fetch` and return JSON from the server.
- Every fetch call has a matching error path, so a failed request shows a message to the user instead of failing silently.
- JSON keys use camel case to match JavaScript variable naming, for example `officerId` rather than `officer_id`, even though the database column itself uses snake case. The server side code is responsible for that translation.
- Any data coming from a form is validated on the client before it is sent, and validated again on the server before it touches the database. Client side validation is for a fast response to the user, server side validation is what actually protects the data.
- Loading and empty states are shown in the UI, for example a short message while results are loading and a different message when a search returns nothing, rather than leaving the page looking broken or stuck.