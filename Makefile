all:
	@for f in src/*.erb; do /usr/bin/ruby erb2json.rb < $$f > docs/json/`basename $$f .erb`; echo docs/json/`basename $$f .erb`; done
