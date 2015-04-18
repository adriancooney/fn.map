var map = require("../"),
	assert = require("assert");

describe("fn.map", function () {
	function a(x, y, z, u) {
		assert.equal(x, 1, "x");
		assert.equal(y, 2, "y");
		assert.equal(z, 3, "z");
		assert(u === undefined);
	}

	it("should map arguments to their correct positions", function() {
		var b = map(a, null, map.$2, map.$3, map.$1);

		b(3, 1, 2);
	});

	it("should map arguments with values", function() {
		var c = map(a, null, map.$2, 2, 3);

		c(null, 1);
	});

	it("should not pass extra arguments to the function", function() {
		var d = map(a, null, 1, 2, 3);

		d(4);
	});

	it("it should provide the right context", function() {
		var ctx = {};

		function c() {
			assert(this === ctx);
		}

		map(c, ctx)();
	});
});