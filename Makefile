PYTHON ?= python
PORT ?= 8000
DATA_FILE ?= data/rules.json

.PHONY: help serve check-data check git-status

help:
	@echo "regwatch-site Makefile targets"
	@echo "  make serve PORT=8000 - Serve the static site locally"
	@echo "  make check-data       - Validate data/rules.json shape"
	@echo "  make check            - Run data check"
	@echo "  make git-status       - Show site repo status"

serve:
	$(PYTHON) -m http.server "$(PORT)"

check-data:
	@if [ ! -f "$(DATA_FILE)" ]; then echo "Missing $(DATA_FILE). Run from parent: make export-site-data"; exit 1; fi
	$(PYTHON) -c "import json, pathlib; p=pathlib.Path('$(DATA_FILE)'); d=json.loads(p.read_text(encoding='utf-8')); records=d.get('records'); assert isinstance(records, list), 'Invalid rules.json: missing list field records'; print('OK: %d records in %s' % (len(records), p))"

check: check-data

git-status:
	git status -sb
