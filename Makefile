PYTHON ?= poetry run python
PORT ?= 8000
DATA_FILE ?= data/rules.json

.PHONY: help serve check-data sitemap check git-status publish clean

help:
	@echo "regwatch-site Makefile targets"
	@echo "  make serve PORT=8000 - Serve the static site locally"
	@echo "  make check-data       - Validate data/rules.json shape"
	@echo "  make sitemap          - Generate sitemap.xml + robots.txt from data/rules.json"
	@echo "  make check            - Run data check"
	@echo "  make git-status       - Show site repo status"
	@echo "  make publish          - git add/commit/push site repo changes"
	@echo "  make clean            - Remove generated site data/routes"

serve:
	$(PYTHON) -m http.server "$(PORT)"

check-data:
	@if [ ! -f "$(DATA_FILE)" ]; then echo "Missing $(DATA_FILE). Run from parent: make export-site-data"; exit 1; fi
	$(PYTHON) -c "import json, pathlib; p=pathlib.Path('$(DATA_FILE)'); d=json.loads(p.read_text(encoding='utf-8')); records=d.get('records'); assert isinstance(records, list), 'Invalid rules.json: missing list field records'; print('OK: %d records in %s' % (len(records), p))"

sitemap: check-data
	$(PYTHON) ../generate_sitemap.py --site-root . --rules-json "$(DATA_FILE)" --base-url "https://regulations.observer"

check: check-data sitemap

git-status:
	git status -sb

publish:
	git add .
	@if git diff --cached --quiet; then \
		echo "No changes to publish."; \
		exit 0; \
	fi
	git commit -m "Automatic publish"
	git push

clean:
	rm -f data/rules.json
	rm -f data/overrides.json
	rm -f sitemap.xml
	rm -f robots.txt
	rm -rf data/documents
	rm -rf data/summaries
	rm -rf document
	mkdir -p data
