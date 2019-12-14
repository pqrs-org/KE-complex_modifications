all:
	bash scripts/update-json.sh
	ruby scripts/lint-groups.rb
	(cd public && ruby ../scripts/make-distjs.rb > dist.json)

rebuild:
	touch src/json/*
	$(MAKE) all

server:
	ruby scripts/dev-server.rb
