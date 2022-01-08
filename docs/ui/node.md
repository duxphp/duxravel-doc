---
sidebar_position: 30
title: Html 节点
---

在 Duxravel 中我们可以利用 `Html节点` 数据将多维数组渲染为 Html 进行输出，提供给视图和需要自定义的元素使用。


## 不能直接用 Html 字符串？

在传统 vue 中我们可以利用 template 模板将 Html 作为 Vue 的模板直接写入页面进行渲染，但 Duxravel 使用异步动态渲染，为了加快解析器速度和使用 Vue 的指令所以不能直接使用 Html 字符串作为渲染内容。


## 格式解析

我们将 `Html内容` 理解为具有上下级别的节点信息，html 如下：

```html
<div class="flex gap-2">
  <div class="border">
    <h2>标题</h2>
    <p>内容描述...</p>
  </div>
</div>
```

我们在 PHP 数组中的 Html 节点数据格式为：

```php
 
$node = [
  'nodeName' => 'div',               // 节点名称
  'class' => 'flex gap-2',           // 节点属性
  'child' => [                       // 子节点数据
    'nodeName' => 'div',
    'class' => 'border',
    'child' => [
      [
        'nodeName' => 'h2',
        'child' => '标题'
      ],
      [
        'nodeName' => 'p',
        'child' => '内容描述...'
      ],
    ]
  ]
];

```

### 节点名称

`nodeName` 代表节点名称，如 `div`、`span` 或 vue 自定义组件名都可以称作节点名称。


### 节点属性

html 中的 class 或者 vue 中的属性参数、指令都为节点属性。


### 子节点数据

`child` 代表子节点数据内容为字符串或嵌套节点数据，可无限级嵌套，如下：

```php

// 子节点为字符串内容
$node = [
  'nodeName' => 'div',
  'child' => '内容数据';
];

// 子节点为 js 变量
$node = [
  'nodeName' => 'div',
  'child' => '{{console.log(item)}}  {{item.name}}';
];

// 子节点为单个节点元素
$node = [
  'nodeName' => 'div',
  'child' => [
    'nodeName' => 'span',
    'child' => '子节点内容'
  ];
];

// 子节点为多个同级节点元素
$node = [
  'nodeName' => 'div',
  'child' => [
    [
      'nodeName' => 'span',
      'child' => '子节点内容1'
    ],
    [
      'nodeName' => 'span',
      'child' => '子节点内容2'
    ],
  ];
];

// 使用 arco 组件
$node = [
  [
    'nodeName' => 'a-slider',
    'default-value' => 50,
  ]
];
```

## 节点视图

有时候我们需要完全将整个后台页面定义为自己的组件则可以在控制器的方法中直接返回 html 节点，格式如下：

```php
public function index()
{
  return app_success('ok', [
    'node' => [
				'nodeName' => 'div',
				'child' => "自定义组件"
		],
    'setupScript' => <<<JS
     // 这里是 vue 单页文件中的 setup 方法的内容
    JS;
  ]);
}
```

## 元素指令

前端対 vue 的指令进行了二次封装以便在 html 节点中使用：

```php
$node = [
    'nodeName' => 'div',
    'vOn:click' => '() => { console.log("点了一下~") }',  // 点击事件，或触发组件事件
    'vBind:text' => 'this.test',   // 绑定事件，可根据组件提供方法绑定
    'data' => [   // 绑定事件，如果值为数组则会自动转换为 v-bind 指令，值会自动转换为 json 
      0 => 'text1',
      1 => 'text2'
    ],
    'vIf' => 'status === true',  // 判断
    'vFor' => '(item, key) in data',
    'vSlot:header' => 'options' // 插槽与插槽参数
    'child' => "自定义组件 {{test}} {{item}} {{options}}", // 子元素或者内容
  ]
];
```

