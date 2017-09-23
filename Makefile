all:
	scripts/update-json.sh
	scripts/erb2html.rb < src/index.html.erb > docs/index.html
	scripts/erb2html.rb < src/example.html.erb > docs/example.html
	scripts/apply-lint.sh

rebuild:
	touch src/json/*
	$(MAKE) all
