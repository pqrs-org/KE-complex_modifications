all:
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
