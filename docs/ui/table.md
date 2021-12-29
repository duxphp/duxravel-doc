---
sidebar_position: 1
title: 表格组件
---

:::tip 提醒
表格组件针对各种常用的列表页面展示方式使用，系统内大部分列表功能均由表格组件完成，表格组件可支持 Eloquent 模型与 Collect 集合作为数据源。
:::

## 实例化对象

将模型作为数据源：

```php
$table = new \Duxravel\Core\UI\Table(new Model());
```

将集合作为数据源：

```php
$table = new \Duxravel\Core\UI\Table(collect());
$table->key('id');
```

## 弹窗布局

在弹窗组件中展示表格

```php
$table->dialog(true);
```

## 渲染表格

将表格组件渲染为数组格式返回给前端渲染

```php
$table->render();
```

## 导出表格

需要将表格内容导出为 Excel 文件时使用

```php
$table->export(function ($export) {
    $export->title('表格标题');
    $export->column('表头标题', '数据字段名');
    $export->column('自定义处理', function ($data) {
        return date('Y-m-d H:i:s', $data->created_at);
    });
});
```

## 设置主键

针对数据模型组件会自动获取表主键，针对数据集合需要手动指定主键便于批量等操作。

```php
$table->key('name');
```

## 表格分页

设置每页表单需要显示的分页数量，默认显示 20 条。

```php
$table->limit(20);
```

## 数据地址

手动指定数据源 url 地址

```php
$table->ajax(string $url = '');
```

## 树形表格

以树形表格展现数据列表

```php
$table->tree();
```

同时需要设置数据排序方式

```php
$table->model()->defaultOrder();
```
