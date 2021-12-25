## 使用方法

表格列为表格组件中的列方法，可自定义展示不通的列数据。

```php
/**
 * 设置列
 * @param string $name 表头名称
 * @param string $label 字段名
 * @param null $callback 数据回调
 * @return Column
 */
$table->column(string $name = '', string $label = '', $callback = null);
```

使用 `.` 来查询关联模型字段，组件会自动使用 Eloquent 的模型关联作为查询[模型关联](https://learnku.com/docs/laravel/8.x/eloquent-relationships/9407)

```php
// 一对多查询指定字段，调用模型中 roles 关联方法查询关联模型的 name 字段
$table->column('角色名', 'roles.name');
```

使用 `->` 来指定集合对象或数组，如果字段值为数组或者集合则可通过该字符获取数组内部数据。

```php
/**
 * data字段内容示例
 * $data = [
 *      'name' => '名称',
 *  ];
 */
$table->column('数组名称', 'data->name');
```

使用回调参数可以处理数据的最终返回结果。

```php
$table->column($name, $label， function($value, $row) {
    retutn $value;
});
```

## 设置宽度

```php
$table->column($name, $label)->width(int $width);
```

## 水平对齐

水平对齐参数支持 `left` `center` `right`。

```php
$table->column($name, $label)->align(string $name);
```

## 文字颜色

单元格文字颜色，支持 `tailwind` 颜色定义。

```php
$table->column($name, $label)->color(string $name);
```

## 格式化时间

将字段值的时间戳格式化为时间日期将调用 `date` 函数处理，如 `Y-m-d H:i:s`。

```php
$table->column($name, $label)->date($format);
```

## 文字描述

将指定字段以灰色显示在主字段下方，可以调用多次方法，回调方法与自定义数据一致。

```php
$table->column($name, $label)->desc(string $label, callable $callback = null);
```

## 图片显示

将指定值以图片显示在主字段左边，可以调用多次方法显示多张图片。

```php
$table->column($name, $label)->image(string $label, callable $callback = null, int $width = 10, int $height = 10, string $placeholder = '');
```

## 状态显示

将字段值作为状态样式显示，可指定颜色与文字，第一个参数指定文字数组，第二个参数指定颜色数组。

```php
$table->column($name, $label)->status([
    2 => '审核中',
    1 => '通过',
    0 => '拒绝'
], [
    2 => 'orange',
    1 => 'green',
    0 => 'red'
]);
```

## 标签显示

将一维数组或 `,` 分割的字符串显示为标签形式。

```php
$table->column($name, $label)->tags([
    1 => '类型一',
    2 => '类型二',
    3 => '类型三'
], [
    1 => 'orange',
    2 => 'green',
    3 => 'red'
]);
```

## 切换开关

将字段值作为切换显示，通过 AJAX 异步值切换，切换值只支持 `0` 或 `1`，切换时会请求指定 `Url` ，请获取对应参数完成处理。

```php
$table->column('状态', 'status')->toggle('status', 'admin.demo.test.status', ['id' => 'test_id']);
```

## 显示进度条

将字段值作为进度条显示，支持 `arco进度条组件` 颜色。

```php
$table->column($name, $label)->progress(string $color = '');
```

## 显示链接

在当前单元格自定义链接显示，可显示多个链接

```php
$column = $table->column('操作');
/**
 * 添加链接
 * @param string $name 名称
 * @param string $route 路由名
 * @param array $params 路由参数，数组值可为字段名如果无匹配字段名则为参数值。
 * @param bool $absolute 绝对地址
 * @return Link
 */
$column->link(string $name, string $route, array $params = [], bool $absolute = false);
// 普通链接
$column->link('编辑', 'admin.demo.test.page', ['id' => 'id']);
// 弹窗链接
$column->link('编辑', 'admin.demo.test.page', ['id' => 'id'])->type('dialog');
// 异步链接
$column->link('删除', 'admin.demo.test.del', ['id' => 'test_id'])->type('ajax')->data(['type' => 'post']);
// js参数链接，将参数的数组值使用 `{}`包裹来进行原生 js 数据获取。
$column->link('编辑', 'admin.demo.test.page', ['id' => '{rowData.record.id}']);
```