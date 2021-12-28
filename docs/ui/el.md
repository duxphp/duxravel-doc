---
sidebar_position: 12
title: 表单元素
---

## 参数说明

数据表单封装了大部分常用的表单组件，也可以根据需求进行扩展组件，通用参数说明：

`$name` 组件名称

`$field` 字段名

`$has` 关联数据源，一对多等数据关联方法或关联表字段，使用 `.` 或者 `->` 指定数据源。

## 文本框

文本框组件均支持扩展方法，更多文本框类型请参考 `文本框组件`。

```php
$form->text(string $name, string $field, string $has = '');

// 文本框前内容
$form->text()->beforeText('每天');
// 文本框后内容
$form->text()->afterText('个');
// 文本框前图标 支持字体图标名与svg
$form->text()->beforeIcon($content);
// 文本框后图标
$form->text()->afterIcon($content);

// 多行文本
$form->textarea(...);

// 编辑器 tinymce
$form->edtior(...);

// 数字输入
$form->number(...);

// 密码输入
$form->password(...);

// 邮箱地址
$form->email(...);

// url 地址
$form->url(...);

// ip 地址
$form->ip(...);

// 手机号码
$form->tel(...);
```

## 下拉选择

`$data` 选择数据，支持数组与回调

```php
$form->select(string $name, string $field, $data = null, string $has = '');

// 数组选项
$form->select('选择器', 'class_id', [
    1 => '分类一',
  2 => '分类二'
]);

// 回调选项
$form->select('选择器', 'class_id', function($value) {
  return [
    1 => '分类一',
    2 => '分类二'
  ];
});

// 下拉多选
$form->select('多选组件', 'type', [
  1 => '类型一',
  2 => '类型二',
])->multi();

// 选项搜索
$form->select('搜索组件', 'role_id')->search(true);

// 异步数据可以指向到后台扩展控制器中的 data方法。
$form->select('异步选项', 'ajax')->url($uri);
```

## 选择框

```php
// 单选框
$form->radio('状态', 'status', [
   1 => '启用',
   0 => '禁用',
]);

// 多选框
$form->checkbox('多选组件', 'type', [
  1 => '类型一',
  2 => '类型二',
]);
```

## 文件上传

```php
$form->file(string $name, string $field, string $has = '');

// 上传模式
$form->file(...)->type('upload');  // 本地上传
$form->file(...)->type('manage');  // 文件管理器

// 设置上传地址
$form->file(...)->url($uri);
  
// 设置文件管理器地址
$form->file(...)->fileUrl($uri);
```

## 图片上传

图片上传与文件上传扩展方法一致

```php
// 单图片上传
$form->image(string $name, string $field, string $has = '');

// 多图片上传
$form->images(string $name, string $field, string $has = '');
```

## 关联选择器

一般用于多条数据的关联选择，选择器会调用弹窗表格选择，数据值请按照表单提交返回二维数组，至少包含主键值

```php
// 基础调用
$form->choice(string $name, string $field, string $has = '');
// 设置选择数据源
$form->choice(...)->ajax(route('路由名'), '数据主键', function ($column) {
  // 选择器展示列
  $column->text('显示标题', 'title');
  $column->image('显示图片', 'image');
  return $column;
}, [
  0 => '类型一',
  1 => '类型二'
])
// 仅展示
$form->choice(...)->show($name, $field);
// 文本输入
$form->choice(...)->text($name, $field);
// 图片上传
$form->choice(...)->image($name, $field);
// 隐藏字段
$form->choice(...)->hidden($name, $filed);
// 禁止操作添加与删除
$form->choice(...)->option(false);
// 最大数量 0不限制
$form->choice(...)->num(0);
```

## 动态数据输入器

用于自定义多条数据输入

```php
// 基础调用
$form->data(string $name, string $field, string $has = '');
// 仅展示
$form->data(...)->show($name, $field);
// 文本输入
$form->data(...)->text($name, $field);
// 图片上传
$form->data(...)->image($name, $field);
// 隐藏字段
$form->data(...)->hidden($name, $filed);
// 禁止添加编辑
$form->data(...)->option(false);
// 最大与最小数量 0不限制
$form->data(...)->max(0);
$form->data(...)->min(0);
```

## 日期选择

```php
// 日期选择器
$form->date(string $name, string $field, string $has = '');
// 日期时间选择器
$form->datetime(string $name, string $field, string $has = '');
// 日期范围选择器
$form->daterange(string $name, string $field, string $has = '');
// 时间选择器
$form->time(string $name, string $field, string $has = '');
```

## 颜色选择

支持通用颜色色系与 16 进制颜色

```php
$form->color(string $name, string $field, string $has = '');
// 自定义颜色
$form->color([
 '#F5F5F5',
]);
```

## 级联选择器

```php
$form->cascader(string $name, string $field, $data = null, string $has = '');
// 数据选项
$form->cascader('多级选择', 'class_id', [
    [
    'id' => 1,
    'name' => '选项一',
    'pid' => 0
  ],
    [
    'id' => 1,
    'name' => '子选项',
    'pid' => 1
  ],
]);
// 回调选项
$form->cascader('多级选择', 'class_id', function ($value) {
  return (new $this->model)->get(['class_id as id', 'parent_id as pid', 'name']);
});
// 数据多选
$form->cascader(...)->multi();
// 可选择叶节点
$form->cascader(...)->leaf(true);
// 异步数据
$form->cascader(...)->url($uri);
// 树形数据 开始后节点数据必须传递树形数据
$form->cascader(...)->tree(true);
```

## 选项开关

```php
$form->toggle('选项内容', '选项描述', $field, string $has = '');
```

## 自定义 html

推荐使用 html 节点可以使用 vue 方法属性进行操作

```php
// 自定义 html 
$form->html('标题', function() {
	return '<span>内容</span>';
}
// 自定义 html 节点
$form->html('标题', function() {
	return [
			'nodeName' => 'span',
			'child' => '内容'
	];
}
```

## 