# 说明

## 基本结构

```js
    class MyPlugins {
        constructor() {

        }
        apply(compiler) { // 必须要有apply方法
            compiler.hooks.xxx.tap(() => { // 调用传入的compiler的hooks对应阶段，
                // 在回调函数中执行对应生命周期的操作
            });
        }
    }
    // 使用
    plugins: [
        new MyPlugins();
    ]
```

## 运行环境搭建

1.将插件引入
2.在plugins中加入 new XX();
