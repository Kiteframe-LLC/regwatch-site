# regwatch-site

Static public site for publishing selected Regulations Observer outputs via GitHub Pages.

See it live: [Regulations.observer](https://regulatios.observer)

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

## Publish Update

Typical flow from parent repo:

```bash
make export-site-data
```

Then in this repo (`regwatch-site`):

```bash
git add .
git commit -m "Update site data"
git push
```
