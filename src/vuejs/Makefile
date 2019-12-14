all: install build copy

serve:
	cd app && npm run serve

install:
	cd app && npm install
	cp app/node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js app/public/vendor/js
	cp app/node_modules/bootstrap/dist/css/bootstrap.min.css app/public/vendor/css

build:
	cd app && npm run build

copy:
	rsync -a --delete \
		app/dist/index.html \
		app/dist/css \
		app/dist/js \
		app/dist/vendor \
		../../public/
