all:
	scripts/update-json.sh

rebuild:
	touch src/json/*
	$(MAKE) all
	scripts/apply-lint.sh

server:
	ruby -rwebrick -e 'WEBrick::HTTPServer.new(:DocumentRoot => "./docs", :Port => 8000).start'
