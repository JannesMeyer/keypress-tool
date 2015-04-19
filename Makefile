BABEL=./node_modules/.bin/babel
JASMINE=./node_modules/.bin/jasmine

js = keypress-tool.es5.js DOMHelpers.es5.js
spec = spec/keypress-tool-spec.es5.js

all: node_modules $(js) $(spec)

test: all
	$(JASMINE)

test-without-color: all
	$(JASMINE) --no-color

node_modules:
	npm install

%.es5.js:: %.js
	$(BABEL) -o $@ $<

.PHONY: all test test-without-color