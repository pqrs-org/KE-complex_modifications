all: install build copy

serve:
	cd app && npm run serve

install:
	cd app && npm install

build:
	cd app && npm run build

copy:
	rsync -a --delete \
		app/dist/index.html \
		app/dist/js \
		app/dist/css \
		../../docs/
