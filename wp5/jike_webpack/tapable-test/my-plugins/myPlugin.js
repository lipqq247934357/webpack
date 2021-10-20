class MyPlugin {
    constructor() {

    }

    // apply 方法，接受compiler参数
    apply(compiler) {
        debugger;
        compiler.hooks.brake.tap("brake", (speed) => { console.log(`set speed ${speed}km/h`); });
    }
}

export default {
    plugins: [new MyPlugin()]
}