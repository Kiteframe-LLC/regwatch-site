# regwatch-site

Static public site for publishing selected RegWatch outputs via GitHub Pages.

## Local preview

From this directory:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Data refresh

From parent repo root:

```bash
python export_site_data.py --input data/step1_candidates.json --output regwatch-site/data/rules.json
```

The export also copies manual reviewed-label overrides from:

- `../data/overrides.json` -> `data/overrides.json`

This export also generates:

- per-document route stubs at `/document/<document-id>/`
- per-document metadata payloads at `/data/documents/<document-id>.json`

## GitHub Pages

Recommended:

- repo: this repo (`regwatch-site`)
- branch: `main`
- folder: `/ (root)`

If using custom domain, add a `CNAME` file at repo root.
