(window['webpack5'] = window['webpack5'] || []).push([['hello'],{
   './src/hello.js': (module, exports, require) => { // require是引用别的模块使用的
      require.r(exports);
      require.d(exports, {
        default:() => DEFAULT_EXPORT,
        age: () => age
      });
      const DEFAULT_EXPORT = 'title_name';
      const age = 'title_age';
    }
}]);