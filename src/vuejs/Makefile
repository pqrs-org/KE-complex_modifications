all: build copy

build:
	docker exec -ti vuejs_ke_complex_modifications_1 npm run build

copy:
	rsync -a --delete \
		app/dist/index.html \
		app/dist/js \
		app/dist/css \
		../../docs/
