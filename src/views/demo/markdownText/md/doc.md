#### Vue父组件监听子组件生命周期

比如有父组件 `Parent` 和子组件 `Child`，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，**`可以在父组件引用子组件时通过 @hook 来监听生命周期钩子函数即可。`** 例如：

```python
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {   
    console.log('父组件监听到 mounted 钩子函数 ...');
},    

//  Child.vue
mounted() {   
    console.log('子组件触发 mounted 钩子函数 ...');
},       

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

#### Vue 的父组件和子组件生命周期钩子函数执行顺序？

1. 加载渲染过程
    
    **父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted**

2. 子组件更新过程
    
    **父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated**
    
3. 父组件更新过程
    
    **父 beforeUpdate -> 父 updated**
    
4. 销毁过程

    **父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed**
    
    

#### Vue组件间通信

除了 props / $emit、eventBus、ref、vux之外，这里重点提及 `provide / inject`

**`provide / inject 适用于 隔代组件通信`**

```python
// 祖组件
provide() {
    return {
      reload: this.reload // reload 方法
    };
  },
  
// 孙砸组件

inject:['reload'],

this.reload() // 调用reload函数
```

[More](https://mp.weixin.qq.com/s/4nhhr3fpJnKjdYxP3VoUuw)