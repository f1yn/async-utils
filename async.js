/**
 * Checks if input is a Promise (or mimics one)
 * @param  {*} instance The instance being checked
 * @return {Boolean} Returns true if the value has the function of a Promise
 */
const isPromise = instance => (
	(instance.constructor && instance.constructor.name === 'Promise') ||
	typeof instance.then === 'function');

/**
 * Wrapper function for invoking a method asynchronously
 * @param  {Function} method The synchronous function to invoke
 * @param  {Promise} baseValue The promise data to await before invocation
 * @param  {Array} args Array of sliced arguments to pass to the element
 * @return {Promise} Resolves after successful invocation of the method
 */
const buildAsyncParserResolver = (method, baseValue, args) =>
	new Promise(resolve => baseValue
		.then(result => resolve(method(result, ...args)))
		.catch(error => error));

/**
 * @private
 * Wraps a method in an error handler with Error passthrough
 * @param  {Function} method The synchronous function to invoke
 * @return {Function} Function that executes method
 */
const methodWrapper = method => (...args) => {
	if (args[0] instanceof Error) return args[0];
	try {
		return method(...args);
	} catch (e) {
		return e;
	}
};

/**
 * Wrapper for binding methods to execute async if first argument is pending
 * @param  {Function} method The function to conditionally execute
 * @return {Function} Wrapper for handling methods as either async
 *    or synchronous depending on arguments passed to it - always checks
 *    first argument
 */
const conditionalAsyncWrapper = baseMethod => {
	if (typeof baseMethod !== 'function') {
		throw new Error(`Async wrapper must take function as primary argument, but recieved ${typeof method}`);
	}

	// wrap baseMethod in condition
	const method = methodWrapper(baseMethod);

	return (...args) => {
		const [baseValue] = args;

		if (isPromise(baseValue)) {
			// process.stdout.write('detected and handling asynchronous data flow...\n');
			return buildAsyncParserResolver(method, baseValue, args.slice(1));
		}

		return method(...args);
	};
};
/**
 * Adapter for allowing the asynchronous flow of data via a flow utility
 * function (e.g. lodash's flow)
 * @param  {Function} flowUtility The flow utility to use for wrapping
 * @return {Function} Function where each argument is remapped as a conditional
 *    passthrough.
 */
const asyncFlowAdapter = flowUtility => (...fcns) => flowUtility(
	fcns.map(fcn => conditionalAsyncWrapper(fcn)));

module.exports = {
	isPromise,
	buildAsyncParserResolver,
	conditionalAsyncWrapper,
	asyncFlowAdapter,
};
