const {
	runLoaders
} = require('loader-runner');
const path = require('path');
const fs = require('fs');
const entryFile = path.resolve(__dirname, 'src/index.js');
const request = `inline1-loader!inline2-loader!${entryFile}`;
const rules = [{
	test: /\.js$/,
	use: ['normal1-loader', 'normal2-loader']
}, {
	test: /\.js$/,
	enforce: 'pre',
	use: ['pre1-loader', {
		loader: 'pre2-loader',
		options: {
			age: '18'
		}
	}]
}, {
	test: /\.js$/,
	enforce: 'post',
	use: ['post1-loader', 'post2-loader']
}];
const parts = request.replace(/^-?!+/, '').split('!');
const resource = parts.pop();
const inlineLoaders = parts;
const preLoaders = [],
	normalLoaders = [],
	postLoaders = [];
for (let i = 0; i < rules.length; i++) {
	let rule = rules[i];
	if (rule.test.test(resource)) {
		if (rule.enforce === 'pre') {
			preLoaders.push(...rule.use);
		} else if (rule.enforce === 'post') {
			postLoaders.push(...rule.use);
		} else {
			normalLoaders.push(...rule.use);
		}
	}
}
let loaders = [];
if (request.startsWith('!!')) {
	loaders = [...inlineLoaders];
} else if (request.startsWith('-!')) {
	loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith('!')) {
	loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
	loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
function resolveLoader(loader) {
	return path.resolve(__dirname, 'loaders-chain', (loader.loader ? loader.loader : loader) + '.js');
}
let resolvedLoaders = loaders.map(resolveLoader);
runLoaders({
	resource,
	loaders: resolvedLoaders,
	context: {
		getCurrentLoader() {
			return this.loaders[this.loaderIndex];
		},
		getOptions() {
			const loader = this.getCurrentLoader();
			return loader.options;
		}
	},
	readResource: fs.readFile.bind(fs)
}, (err, result) => {
	console.log(err);
	console.log(result);
});