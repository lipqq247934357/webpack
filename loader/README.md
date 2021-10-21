# loader

loader是一个函数，接受资源，返回处理之后的结果；

## loader执行顺序，从后往前

compose执行顺序,类似下面的原理

```js
compose = (f,g) => (...args) => f(g(args));
```

## 为什么分成4种loader？

因为类型不同，执行的顺序不同

## pitch 是从左向右执行的

一般不提供
如果pitch返回值了的话，就不走后面的loader了，直接走前一个的loader

## 特殊符号（！，！！，-！） 决定引入哪些loader

## loader创建

一个函数

## [loader-runner](https://github.com/webpack/loader-runner)

## loader异常处理

直接抛出异常
2.其他的暂时没看
