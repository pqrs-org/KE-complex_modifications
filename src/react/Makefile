.PHONY: build

start:
	npm run start

build:
	npm run build

deploy:
	$(MAKE) install
	$(MAKE) build
	rsync -a --delete \
		build/index.html \
		build/static \
		build/vendor \
		../../public

install:
	npm ci --no-audit
	cp node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js public/vendor/js
	cp node_modules/iframe-resizer/js/iframeResizer.contentWindow.map public/vendor/js
	cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendor/css
	cp node_modules/bootstrap/dist/css/bootstrap.min.css.map public/vendor/css
	$(MAKE) audit

update:
	npm update --no-audit
	$(MAKE) audit

audit:
	npm audit --omit=dev

format:
	npm run format
