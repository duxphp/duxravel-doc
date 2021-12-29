---
sidebar_position: 20
title: 通用组件
---

独立组件可以嵌套使用也可以在表格、表单组件内进行使用，组件支持通用方法如下，组件内方法请使用回调处理

```php
$widget = \Duxravel\Core\UI\Widget::$widget($params...);
// 组件属性
$widget->attr('style', 'width: 100px;');
// class 样式
$widget->class('class');
```

独立组件的渲染可使用回调方法与手动连贯操作，请根据场景自行选择：

```php
// 组件渲染
$node = \Duxravel\Core\UI\Widget::icon('cog', function(\Duxravel\Core\UI\Widget\Icon $icon) {
});
// 独立渲染
$html = (new \Duxravel\Core\UI\Widget\Icon('fa fa-cog'))->tooltips('提示内容', 'top')->render();
```

## 网格布局

行总列数为 12 可以设置每行相加为 12 的多种列宽组合，不指定列宽为平均分配。

```php
$html = \Duxravel\Core\UI\Widget::row(function($row) {
    // 设置列宽度为9
  $row->column(function() {
    return 'html或组件';
  }, 9);
  // 设置列宽度为3
  $row->column(function() {
    return 'html或组件';
  }, 3);
});
```

## 多彩标签

```php
\Duxravel\Core\UI\Widget::badges('标签', function($badge) {
	// 标签颜色，仅 arco 颜色
  $badge->color('blue');
});
```

## 自定义图标

支持 `svg` 图标

```php
$html = \Duxravel\Core\UI\Widget::icon('<svg ....');
```

系统集成 arco 的图标，可直接使用，[Arco Design Vue](https://arco.design/vue/component/icon)

```php
$html = \Duxravel\Core\UI\Widget::icon('archive');
```

## 提示框

```php
$html = \Duxravel\Core\UI\Widget::alert('提示框内容', '提示框标题', function($alert) {
  // 提示框类型 info  success warning error
  $alert->type('success');
});
```

## 链接按钮

```php
/**
  * Link constructor.
  * @param string $name 链接名称
  * @param string $route 路由名
  * @param array $params 路由参数
  * @param callable|null $callback 组件回调
  */
\Duxravel\Core\UI\Widget::link(string $name, string $route = '', array $params = [], string $type = 'primary', callable $callback = NULL);

$html = \Duxravel\Core\UI\Widget::link('链接文字', 'admin.index', ['a' => 1, 'b' => 1], function($link) {
  // 设置为按钮
  $link->button('primary');
  // 弹窗链接
  $link->type('dialog');
  // AJAX链接
  $link->type('ajax', ['type' => 'post']);
});
```

## 下拉菜单

```php
/**
 * Menu constructor.
 * @param string $name 按钮名称
 * @param string $type 按钮类型 支持通用颜色
 * @param callable|null $callback 按钮回调
 */
\Duxravel\Core\UI\Widget::menu(string $name, string $type = 'default', callable $callback = NULL);

\Duxravel\Core\UI\Widget::menu('下拉菜单', 'default', function($menu) {
  // 添加条目
  $menu->link(string $name, string $route = '', array $params = []);
});
```



## 更多组件

:::tip 提醒
您可以采用在可嵌入组件的数组中直接嵌入 arco.resign 中的任意组件和html，系统支持在 node 模式下编写自定义组件。
:::

```php
return [
	'node' => [
		[
				'nodeName' => 'div',
				'child' => "自定义组件"
		],
		[
			'nodeName' => 'a-slider',
			'default-value' => 50,
		]
	]
];
```

还可以在组件中使用任意 vue 绑定方法：

```php
return [
	'node' => [
		[
			'nodeName' => 'div',
            'vOn:click' => '() => { console.log("点了一下~") }',  // 点击事件
			'vBind:text' => 'this.test',   // 绑定事件
            'vIf' => 'status === true',  // 判断
            'vSlot:header' => 'options' // 插槽与插槽参数
            'vFor:data' => 'item, key',
			'child' => "自定义组件 {{test}} {{item}} {{options}}", // 子元素或者内容
		],
		'setupScript' => <<<JS
          const test = ref('测试文本')
          const show = ref(true)
          const data = ref([1, 2, 3, 4, 5])
          return {
            test,
            show,
            data
          }
		>>>
	]
];
```

