all: install build copy

serve:
	npm run serve

install:
	npm install
	cp node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js public/vendor/js
	cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendor/css

build:
	npm run build

copy:
	rsync -a --delete \
		dist/index.html \
		dist/css \
		dist/js \
		dist/vendor \
		../../public/
