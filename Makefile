all:
	make -C core

rebuild:
	make -C core rebuild

update-dist:
	make -C core update-dist

preview-server:
	make -C core preview-server
