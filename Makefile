all:
	sh scripts/update-json.sh
	/usr/bin/ruby scripts/erb2html.rb < src/index.html.erb > docs/index.html
	/usr/bin/ruby scripts/erb2html.rb < src/example.html.erb > docs/example.html
	sh scripts/apply-lint.sh

rebuild:
	touch src/json/*
	$(MAKE) all
