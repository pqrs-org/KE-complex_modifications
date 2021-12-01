start:
	npm run start

install:
	npm ci --no-audit
	$(MAKE) audit

update:
	npm update --no-audit
	$(MAKE) audit

audit:
	npm audit --production

format:
	npm run format
