all:
	@echo
	@echo "============================================================"
	@echo "Using a pre-built binary for lint."
	@echo "The code signature of the binary is as follows:"
	@echo
	@codesign -dvv bin/karabiner_cli
	@echo "============================================================"
	@echo

	bash scripts/update-json.sh
	python3 scripts/lint-src-json.py src/json
	python3 scripts/lint-public-json.py public/json
	ruby scripts/lint-groups.rb
	bash scripts/update-public-build.sh

rebuild:
	touch src/json/*
	$(MAKE) all

server:
	ruby scripts/dev-server.rb
