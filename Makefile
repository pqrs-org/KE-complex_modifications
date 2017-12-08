all:
	scripts/update-json.sh
	scripts/apply-lint.sh

rebuild:
	touch src/json/*
	$(MAKE) all

server:
	ruby -rwebrick -e 'WEBrick::HTTPServer.new(:DocumentRoot => "./docs", :Port => 8000).start'
