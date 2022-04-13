install:
	npm ci;

publish:
	npm publish --dry-run;

make lint:
	npx eslint .;