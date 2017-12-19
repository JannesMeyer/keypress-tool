TSC = ./node_modules/.bin/tsc

.PHONY: all
all: node_modules
	@$(TSC)

.PHONY: clean
clean:
	-rm -f *.log *.js ./spec/*.js

node_modules:
	npm install