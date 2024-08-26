const babel = require('@babel/core');
function loader(sourceCode, inputSourceMap, inputAst) {
	//正在处理的文件绝对路径  C:\aproject\zhufengwebpack20230305\8.loader\src\index.js
	const filename = this.resourcePath;
	debugger
	const useOptions = this.getOptions();
	const options = {
		filename,
		inputSourceMap,//指定输入代码的sourcemap
		sourceMaps: true,//表示是否要生成sourcemap
		sourceFileName: filename,//指定编译 后的文件所属的文件名
		ast: true,//是否生成ast
		...useOptions
	}
	//.babelrc babel.config.js
	const config = babel.loadPartialConfig(options);
	if (config) {
		babel.transformAsync(sourceCode, config.options, (err, result) => {
			this.callback(null, result.code, result.map, result.ast);
		});
		//console.log(result);
		//return result.code;
		//code 转译后的代码 map sourcemap映射文件 ast 抽象语法树
		return;
	}
	return sourceCode;
}
module.exports = loader;