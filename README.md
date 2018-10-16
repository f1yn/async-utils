# async-utils

[![Build Status](https://travis-ci.org/flynnham/async-utils.svg?branch=master)](https://travis-ci.org/flynnham/async-utils)
[![npm](https://img.shields.io/npm/v/@o3/async-utils.svg)](https://www.npmjs.com/package/@o3/async-utils)
[![dependencies Status](https://david-dm.org/flynnham/async-utils/status.svg)](https://david-dm.org/flynnham/async-utils)
[![devDependencies Status](https://david-dm.org/flynnham/async-utils/dev-status.svg)](https://david-dm.org/flynnham/async-utils?type=dev)

A bunch of miniature ES2015+ async helpers for remapping functions.

## Installation
```bash
npm i -S @o3/async-utils
```

## Methods overview

| name | description |
|---|---|
| `isPromise(instance: any)` | Takes single value argument to check if the value either has a Promise constructor or has a valid `.then` function. |
| `buildAsyncParserResolver(method: Function, baseValue: Promise or any, args: Array)` | Execution handler for asynchronous data (used by `conditionalAsyncWrapper`) |
| `conditionalAsyncWrapper(method: Function) => (...args)` | Build a execution handler around a specified `method`, which executes based on the first argument provided. If a Promise is provided, the data flow will be paused until the first item in `args` has been resolved. Any `args` are also applied to the `method` when the first `args` value is ready. |
| `asyncFlowAdapter(flowUtility: Function) => (...fcns: [Function])` | Builds a asynchronous handler wrapper for a directional data flow utility (such as `_.flow`). Returns a `Function` that takes arguments of type `Function` <br><br> Note that an asynchronous `Promise` flow will only be built if at least **one** of the functions passed to flow returns a `Promise`, otherwise the flow will mimic the functionality of a synchronous data-flow. This is done by design <br><br> If any method invoked during the data flow throws, an `Error` instance is passed through the flow until it reaches the end resolve. If the flow fails, the first `Error` exception will be the only value returned. |
