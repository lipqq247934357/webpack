function loader(sourceCode) {
	console.log('pre2');
	let options = this.getOptions();
	console.log(options);
	let resourcePath = this.resourcePath;
	let resourceQuery = this.resourceQuery;
	let resource = this.resource;
	console.log(resourcePath);
	console.log(resourceQuery);
	console.log(resource);
	return sourceCode + '//pre2'
}
loader.pitch = function () {
	console.log('pre2-pitch');
}
module.exports = loader;