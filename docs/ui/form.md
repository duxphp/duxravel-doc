---
sidebar_position: 10
title: 表单组件
---

## 基础说明

表单组件用于各类后端表单页提交用途，表单组件可支持 `Eloquent` 模型与 `collect` 集合作为数据源。

## 实例化表单

通过以下代码在控制器内进行使用，将模型作为数据源。

```php
public function form() {
  $form = new \Duxravel\Core\UI\Form(new Model());
  return $form;
}
```

将集合作为数据源，`id` 为编辑时的主键值。

```php
$form = new \Duxravel\Core\UI\Form(collect());
$form->setKey('user_id', $id);
```

## 基础方法

可使用的表单基础方法：

```php
// 指定提交地址
$form->action($uri);

// 获取表单数据 - 指定 key 时可获取
$form->info();

// 模型代理 - 可直接操作数据
$form->model();

// 原始模型 - 対数据无影响
$form->modelElo();

// 数据提交前回调
$form->submit(function($data, $time) {});

/**
 * 数据处理前回调
 * @params object $data 数据对象
 * @params string $time 数据时间 add 或 edit
 * @params Model $model 模型对象
 */
$form->front(function($data, $time, $model) {});

// 数据保存前回调
$form->before(function($data, $type, $model) {});

// 验证规则回调
$form->validator(function($validator) {});

// 数据保存后回调
$form->after(function($data, $type, $model) {});
```

## 元素通用方法

使用元素时可以调用以下方法进行元素设置：

```php
// 自定义数据值
$form->text('名称', 'name')->value('这是名称');

// 设置默认值
$form->text()->default('默认');

// 帮助元素
// 该信息显示在输入组件之后
$form->text()->help('组件帮助描述信息');
// 该信息显示在单独行
$form->text()->helpLine('组件帮助描述信息');
// 该信息显示为帮助图标
$form->text()->prompt('组件帮助描述信息');

// 必填数据
$form->text()->must();

// 组件属性, 设置前端组件额外属性
$form->text()->attr('key', 'value');
```

## 数据验证

设置组件提交数据验证，验证规则请查看文档。

https://learnku.com/docs/laravel/8.x/validation/9374

```php
/**
	* @param string $rule 验证规则
	* @param string $msg 验证消息
	* @param string $time 验证时间 all、add、edit
	*/
$form->text()->verify($rule, array $msg = [], string $time = 'all');
// 示例如下：
 $form->text('文本框', 'title')->verify('required|min:4', [
   'required' => '必须填写该内容',
   'min'      => '最小字符不能少于4个',
 ]);
```

## 数据格式化

格式化提交后的数据为指定回调数据。

```php
/**
	* @param $value 数据值
	* @param string $time 数据时间 all、add、edit
	*/
$form->text()->format(function($value) {
  return $value;
}, $time);
```

## 前端预处理

使用该方法可以直接在 vue 中的 `setup` 方法中插入 js 脚本。

```php
<?php
// 第二个参数为导出的变量，可以通过 this.test 调用
$form->script('const test = "测试变量"', 'test');
```