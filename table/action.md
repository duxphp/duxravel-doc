## 使用方法

使用该方法放置表格中的`添加`、`导出` 等操作按钮

```php
$table->action();
```

## 链接按钮

AJAX 链接为点击按钮出发异步请求，默认为 get 请求，可以传递参数指定post 等类型

```php
/**
 * 添加按钮
 * @param string $name 按钮名称
 * @param string $label 路由名
 * @param array $params 路由参数
 * @param string $type 按钮类型
 * @return Link
 */
$table->action()->button(string $name, string $route = '', array $params = [], string $type = 'primary');
// 普通链接
$table->action()->button('添加', 'admin.add');
// 弹窗链接
$table->action()->button('添加', 'admin.add')->type('dialog');
// AJAX链接
$table->action()->button('添加', 'admin.add')->type('ajax', ['method' => 'post']);
```

## 菜单按钮

按钮太多时需要将多个按钮合并在一个菜单内可以使用该方法

`link` 方法与链接按钮的连贯方法一致均可使用 `dialog` 与 `ajax` 类型

```php
$menu = $table->action()->menu('菜单名称');
$menu->add('添加', 'admin.add', ['id' => 1]);
$menu->add('导出', 'admin.export');
```

## 前端数据

在一些非常复杂的交互场景下需要将路由参数直接传递 vue 模型数据可以通过 `{}`将需要的参数包裹起来动态赋值。

```php
$menu->add('添加', 'admin.add', ['class_id' => '{data.filter.class_id}']);
```

