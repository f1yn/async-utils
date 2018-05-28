
const assert = require('assert');
const flow = require('lodash.flow');

const asyncUtils = require('./async');

const BASE_INPUT = 'testString';
const EXPECTED_OUTPUT = `_abx${BASE_INPUT}xba_`;

const syncFunction1 = input => `x${input}x`;
const asyncFunction1 = async input => `b${input}b`;
const syncFunction2 = input => `a${input}a`;
const asyncFunction2 = async input => `_${input}_`;

/**
 * Flow adapter test covers all the code within this module (not edge cases)
 */
describe('flow adapter', async () => {
	let asyncFlow;
	let testFlow;

	before(() => {
		// build async flow adapter
		asyncFlow = asyncUtils.asyncFlowAdapter(flow);

		// build asynchronous data flow
		testFlow = asyncFlow(
			syncFunction1,
			asyncFunction1,
			syncFunction2,
			asyncFunction2
		);
	});

	it(`handles async data flow`, async () => {
		const rendered = await testFlow(BASE_INPUT);
		assert(rendered === EXPECTED_OUTPUT, `unexpected result ${rendered}, expected ${EXPECTED_OUTPUT}`);
	});
});
