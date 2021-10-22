# RECORD

## Symbol.toStringTag

```js
let myExports = {};
console.log(Object.prototype.toString.call(myExports));
Object.defineProperty(myExports, Symbol.toStringTag, { value: "Module" });
console.log(Object.prototype.toString.call(myExports)); //[object Module]
```

## defineProperty

```js
let obj = {};
var ageValue = 10;

Object.defineProperty(obj, "age", {
  //writable: true, //是否可修改
  //value: 10, //writeable 和 set不能混用
  get() {
    return ageValue;
  },
  set(newValue) {
    ageValue = newValue;
  },

  enumerable: true, //是否可枚举
  configurable: true, //是否可配置可删除
});

console.log(obj.age);
obj.age = 20;
console.log(obj.age);
```

## bundle

### 模块转换,如果文件有 import export 是 es module，需要进行处理

将es6 module转化成common模块

### 转化逻辑

  1.将es6模块转化成commonjs模块  
  2.根据import()动态切割代码

### 动态import通过创建script标签动态添加模块，然后执行
