# fn.map
### Function binding with argument mapping.
For too long in Javascript I have used this pattern.

```js
function doSomething(callback) {
	// .. get some data
	callback(stuff, otherStuff)
}

function doSomethingElse(otherStuff) {
	// .. do something else
}

// I only need `otherValues` but I get `values` with it
// This prevents me from simply:
// soSomething(doSomethingElse.bind(null));

doSomething(function(values, otherValues) {
	doSomethingElse(otherValues)
});
```

Don't see anything wrong? I do, an extra callback! I should just be able to `bind` that function and forget about creating another function to just essentially move on argument to another position. It really impairs any functional style of Javascript, well at least I think so anyway. With `map`, you can do the following:

```js
// Map the second argument to the first position (null is the context, similar to .bind)
doSomething(map(doSomethingElse, null, map.$2));
```

### Installation
Install from npm:

	$ npm install --save fn.map
	

#### `map(fn {function}, context {object}, args..{ map.$* | anything })` -> `Function`
Take in a function, bind it to a context and return another function that maps incoming arguments to the inital function.

#### Examples
Want to log something in array but don't want those pesky indexes and the array arguments?

```js
var a = [1, 2, 3, 4];

a.forEach(map(console.log, console, map.$1)); // Only log the numbers
```

Want to map over values returned from a previous function in the waterfall chain in async?

```js
async.waterfall([
	getSomeValues.bind(null, "some argument"),
	map(async.eachSeries, async, map.$1, function iterator(value) {
		console.log("Values!");
	}, map.$2) // Don't forget to map the passed callback!
])
```

License: MIT