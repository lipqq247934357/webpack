module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log('1111');
        console.log(`options:${this.options}`);
    }
}