const url = require('url');
function createLoaderObject(loader) {
	let normal = require(loader);
	let pitch = normal.pitch;
	let raw = normal.raw || true;
	return {
		path: loader,
		normal,
		pitch,
		normalExecuted: false,
		pitchExecuted: false,
		data: {},
		raw
	};
}
function iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback) {
	if (loaderContext.loaderIndex < 0) {
		return pitchingCallback(null, args);
	}
	let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
	if (currentLoader.normalExecuted) {
		loaderContext.loaderIndex--;
		return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
	}
	let fn = currentLoader.normal;
	currentLoader.normalExecuted = true;
	convertArgs(args, currentLoader.raw);
	runSyncOrAsync(fn, loaderContext, args, (err, ...returnArgs) => {
		return iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchingCallback);
	});
}
function convertArgs(args, raw) {
	if (raw && !Buffer.isBuffer(args[0])) {
		args[0] = Buffer.from(args[0]);
	} else if (!raw && Buffer.isBuffer(args[0])) {
		args[0] = args[0].toString('utf-8');
	}
}
function processResource(processOptions, loaderContext, pitchingCallback) {
	processOptions.readResource(loaderContext.resourcePath, (err, resourceBuffer) => {
		processOptions.resourceBuffer = resourceBuffer;
		loaderContext.loaderIndex--;
		iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], pitchingCallback);
	});
}
function iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback) {
	if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
		return processResource(processOptions, loaderContext, pitchingCallback);
	}
	let currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
	if (currentLoader.pitchExecuted) {
		loaderContext.loaderIndex++;
		return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
	}
	let fn = currentLoader.pitch;
	currentLoader.pitchExecuted = true;
	if (!fn) {
		return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
	}
	runSyncOrAsync(fn, loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data], (err, ...args) => {
		if (args.length > 0 && args.some(item => item)) {
			loaderContext.loaderIndex--;
			return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback);
		} else {
			return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback);
		}
	});
}
function runSyncOrAsync(fn, loaderContext, args, runCallback) {
	let isSync = true;
	loaderContext.callback = (err, ...args) => {
		runCallback(err, ...args);
	};
	loaderContext.async = () => {
		isSync = false;
		return loaderContext.callback;
	};
	let result = fn.apply(loaderContext, args);
	if (isSync) {
		runCallback(null, result);
	}
}
function runLoaders(options, finalCallback) {
	const {
		resource,
		loaders = [],
		context = {},
		readResource = fs.readFile.bind(fs)
	} = options;
	let loaderContext = context;
	let loaderObjects = loaders.map(createLoaderObject);
	Object.defineProperty(loaderContext, "resource", {
		get: function () {
			return loaderContext.resourcePath + loaderContext.resourceQuery;
		},
		set: function (value) {
			var splittedResource = url.parse(value);
			loaderContext.resourcePath = splittedResource.pathname;
			loaderContext.resourceQuery = splittedResource.query;
		}
	});
	loaderContext.resource = resource;
	loaderContext.readResource = readResource;
	loaderContext.loaders = loaderObjects;
	loaderContext.loaderIndex = 0;
	loaderContext.callback = null;
	loaderContext.async = null;
	Object.defineProperty(loaderContext, 'request', {
		get() {
			return loaderContext.loaders.map(loader => loader.path).concat(resource).join('!');
		}
	});
	Object.defineProperty(loaderContext, 'remainingRequest', {
		get() {
			return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loader => loader.path).concat(resource).join('!');
		}
	});
	Object.defineProperty(loaderContext, 'currentRequest', {
		get() {
			return loaderContext.loaders.slice(loaderContext.loaderIndex).map(loader => loader.path).concat(resource).join('!');
		}
	});
	Object.defineProperty(loaderContext, 'previousRequest', {
		get() {
			return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loader => loader.path).join('!');
		}
	});
	Object.defineProperty(loaderContext, 'data', {
		get() {
			return loaderContext.loaders[loaderContext.loaderIndex].data;
		}
	});
	let processOptions = {
		resourceBuffer: null,
		readResource
	};
	iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
		finalCallback(err, {
			result,
			resourceBuffer: processOptions.resourceBuffer
		});
	});
}
exports.runLoaders = runLoaders;