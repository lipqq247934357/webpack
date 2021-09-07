// webpack 自定义事件
class SyncHook {
    constructor(args) {
        this.args = args || [];
        this.taps = [];
    }

    tap(name,fn) {
        this.taps.push(fn);
    }

    call() {
        let args = Array.prototype.slice.call(arguments,0,this.arguments.length);
        this.taps.forEach(tap=>tap(...args));
    }

}