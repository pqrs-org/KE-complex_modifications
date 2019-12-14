all:
	bash scripts/update-json.sh
	ruby scripts/lint-groups.rb
	bash scripts/update-public-build.sh

rebuild:
	touch src/json/*
	$(MAKE) all

server:
	ruby scripts/dev-server.rb
