/**
 * Map arguments to different positions.
 *
 * Example:
 *
 * 	async.waterfall([
 * 		getArrayOfValues.bind(null, "some-arg"),
 * 		map(async.eachSeries, async, map.$1, function iterator(value) {
 * 		
 * 		}) // Callback will still be passed
 * 	], function() {
 * 		console.log("Done!");
 * 	});
 * 	
 * @param  {Function} fn      The function to map the arguments to.
 * @param  {Object}   context The context to call the function in.
 * @return {Function}         Binded function.
 */
var map = function(fn, context) {
	var args = Array.prototype.slice.call(arguments, 2);

	return function() {
		var passedArgs = Array.prototype.slice.call(arguments);

		fn.apply(context, args.map(function(arg) {
			if(arg instanceof map.Arg) return passedArgs[arg.index - 1];
			else return arg;
		}));
	}
};

map.Arg = function(index) {
	this.index = index;
};

for(var i = 0; i < 30; i++) map["$" + i] = new map.Arg(i);

module.exports = map;