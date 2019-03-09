all:
	bash scripts/update-json.sh
	ruby scripts/lint-groups.rb
	(cd docs && ruby ../scripts/make-distjs.rb > dist.json)

rebuild:
	touch src/json/*
	$(MAKE) all
	scripts/apply-lint.sh docs/json/*.json
	ruby scripts/lint-groups.rb

server:
	ruby scripts/dev-server.rb
