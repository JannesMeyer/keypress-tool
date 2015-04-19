BABEL=./node_modules/.bin/babel
JASMINE=./node_modules/.bin/jasmine

js = index.es5.js
spec = spec/index-spec.es5.js

all: $(js) $(spec) node_modules

test: all
	$(JASMINE)

test-without-color: all
	$(JASMINE) --no-color

node_modules:
	npm install

%.es5.js:: %.js
	$(BABEL) -o $@ $<

.PHONY: all test test-without-color