all: blooms.js

blooms.js: blooms.ts
	tsc blooms.ts

clean:
	rm blooms.js
