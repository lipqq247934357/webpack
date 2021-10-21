# loader

## loader 从右向左

## 为什么分成4种loader？

    因为类型不同，执行的顺序不同

## pitch 是从左向右执行的

    一般不提供
    如果pitch返回值了的话，就不走后面的loader了，直接走前一个的loader

## 特殊符号（！，！！，-！） 决定引入哪些loader
