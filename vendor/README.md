# Vendored JS: marked

This directory contains third-party JavaScript vendored for deterministic local hosting.

## Package
- Name: `marked`
- Purpose: Markdown-to-HTML rendering in document detail/summary/analysis views.
- Upstream project: https://github.com/markedjs/marked

## Provenance
- Source URL: https://cdn.jsdelivr.net/npm/marked/marked.min.js
- Retrieved: 2026-03-14
- Retrieved file header reports: `marked v15.0.12`
- SHA-256: `3e7e7d7feb3e5d58cb6c804f68ab5c24cc7e5eb6270fd6e5cbb9124739217d0c`

## License
- License: MIT
- Copyright notice in file header:
  - Copyright (c) 2011-2025, Christopher Jeffrey.
- See upstream repo for full license text and updates.

## Update Procedure
1. Download replacement `marked.min.js` from official release/CDN source.
2. Verify expected version/header.
3. Record new SHA-256 and retrieval date in this file.
4. Re-export site stubs (`export_site_data.py`) so generated routes reference local `/vendor/marked.min.js`.
