all:
	sh scripts/update-json.sh
	/usr/bin/ruby scripts/erb2html.rb < src/index.html.erb > docs/index.html
	sh scripts/apply-lint.sh

rebuild:
	touch src/json/*
	$(MAKE) all
