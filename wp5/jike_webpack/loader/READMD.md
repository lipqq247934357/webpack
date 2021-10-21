# 说明

## loader执行顺序，从后往前

    1.compose执行顺序,类似下面的原理

```js
compose = (f,g) => (...args) => f(g(args));
```

## loader创建

    一个函数

## [loader-runner](https://github.com/webpack/loader-runner)
