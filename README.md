# async-utils

A bunch of miniature ES2015+ async helpers for remapping functions.

## Methods overview

| name | description |
|---|---|
| `isPromise(instance: any)`  | Takes single value argument to check if the value either has a Promise constructor or has a valid `.then` function. |
| `buildAsyncParserResolver(method: Function, baseValue: Promise || any, args: Array)` | Execution handler for asynchronous data (used by `conditionalAsyncWrapper`) |
| `conditionalAsyncWrapper(method: Function) => (...args)` | Build a execution handler around a specified `method`, which executes based on the first argument provided. If a Promise is provided, the data flow will be paused until the first item in `args` has been resolved. Any `args` are also applied to the `method` when the first `args` value is ready. |
| `asyncFlowAdapter(flowUtility: Function) => (...fcns: [Function])` | Builds a asynchronous handler wrapper for a directional data flow utility (such as `_.flow`). Returns a `Function` that takes arguments of type `Function` |
