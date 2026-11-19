# regwatch-site

Static public site for publishing selected Regulations Observer outputs via GitHub Pages.

See it live: [Regulations.observer](https://regulations.observer)

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

- per-docket route stubs at `/docket/<docket-id>/`
- per-docket metadata payloads at `/data/documents/<docket-id>.json`

Docket pages contain their summary, analysis, comments, and supporting material
in the initial HTML. JavaScript enhances this content with tabs and pagination.
Each docket has one canonical URL; `#summary` or `#analysis` opens a tab, and
`#document-<document-id>--analysis` opens a particular document's analysis.
Legacy tab and document paths redirect to docket fragments. Only canonical
docket pages are included in the sitemap. The homepage includes a static docket
directory so discovery does not depend on JavaScript.

The parent export requires Node.js 22+ and runs `scripts/render_docket_pages.js`
after writing the content payloads. To rerender an existing bundle from the
parent repository without fetching or rescoring data:

```bash
node scripts/render_docket_pages.js regwatch-site
poetry run python generate_sitemap.py
```

From the parent repo root, `make site-refresh` runs the export and then validates the site bundle with `make -C regwatch-site check`.

## GitHub Pages

Recommended:

- repo: this repo (`regwatch-site`)
- branch: `main`
- folder: `/ (root)`

If using custom domain, add a `CNAME` file at repo root.

## Publish Update

Typical flow from parent repo:

```bash
make site-refresh
```

Then in this repo (`regwatch-site`):

```bash
git add .
git commit -m "Update site data"
git push
```
