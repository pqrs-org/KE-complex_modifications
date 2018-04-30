all:
	bash scripts/update-json.sh

rebuild:
	touch src/json/*
	$(MAKE) all
	scripts/apply-lint.sh

server:
	ruby scripts/dev-server.rb
