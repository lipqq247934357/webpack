// 将compiler传递给插件执行
import { Compiler } from './compiler.js';
import config from './myPlugin.js';

const compiler = new Compiler();
debugger;
if (config && Array.isArray(config.plugins)) {
    config.plugins.forEach(plugin => {
        if (typeof plugin === "function") {
            plugin(compiler, compiler)
        } else {
            plugin.apply(compiler);
        }
    })
}

compiler.hooks.brake.call(10);