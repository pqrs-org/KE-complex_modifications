all:
	scripts/update-json.sh
	scripts/erb2html.rb < src/example.html.erb > docs/example.html
	scripts/apply-lint.sh

rebuild:
	touch src/json/*
	$(MAKE) all

server:
	ruby -rwebrick -e 'WEBrick::HTTPServer.new(:DocumentRoot => "./docs", :Port => 8000).start'
