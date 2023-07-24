all:
	make -C core

rebuild:
	make -C core rebuild

update-public-build:
	make -C core update-public-build

server:
	make -C core server
