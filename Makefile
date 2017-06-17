all:
	@for f in src/*.erb; do /usr/bin/ruby erb2json.rb < $$f > dist/`basename $$f .erb`; echo dist/`basename $$f .erb`; done
