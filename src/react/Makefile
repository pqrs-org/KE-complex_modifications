.PHONY: build

start:
	npm run start

build:
	npm run build

deploy:
	$(MAKE) build
	rsync -a --delete \
		build/asset-manifest.json \
		build/favicon.ico \
		build/index.html \
		build/logo192.png \
		build/logo512.png \
		build/manifest.json \
		build/static \
		build/vendor \
		../../public

install:
	npm ci --no-audit
	cp node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js public/vendor/js
	cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendor/css
	$(MAKE) audit

update:
	npm update --no-audit
	$(MAKE) audit

audit:
	npm audit --production

format:
	npm run format
