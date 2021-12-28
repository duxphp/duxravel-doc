---
sidebar_position: 5
title: 表格批处理
---

## 使用方法

将选中数据进行`异步`提交给后端进行数据处理，处理成功后刷新页面，基础方法如下：

```php
$table->batch();
```

## 操作按钮

点击按钮系统会进行异步请求指定路由并附带选中表格条目 `id` ，请使用 `request()` 自行接收请求参数处理，默认会传递 `ids` 选中 id 数组。

```php
/**
 * @param string $name 表头名称
 * @param string $route 字段名
 * @param array $params 字段名
 * @param string $type 按钮类型
 * @return Column
 */
$table->batch()->button(string $name, string $route = '', array $params = [], string $type = 'primary');
```

## 下拉操作

通过下拉菜单选择形式进行批量操作

```php
$table->batch()->select(string $name, string $route = '', array $params = []);
// 下拉示例
$table->batch()->select('批量操作', 'system.batch');
```