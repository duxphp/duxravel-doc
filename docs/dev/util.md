---
sidebar_position: 6
title: 常用工具类
---

## Apex 图表

该类封装了 [apexcharts](https://apexcharts.com/) 的常用图表和数据调用方法。

```php
$data = [
  [
    'name' => '类别名',
    'value' => 100,
    'label' => 1624948229,  // 时间戳
  ],
];


// 按天显示7天内区域图
$chatJs = (new \Duxravel\Core\Util\Charts)
  ->area()
  ->date(date('Y-m-d', strtotime('-6 day')), date('Y-m-d'), '1 days', 'm-d')
  ->data('访问量', $data)
  ->height(200)
  ->render(true);


// 线性图
$chatJs = (new \Duxravel\Core\Util\Charts)->line();


// 柱状图
$chatJs = (new \Duxravel\Core\Util\Charts)->column();
```

## 标签扩展

类注册一些自定义模板标签

```php
/**
 * 普通标签
 * 模板中通过 @name([...]) 使用
 * @param string $name 标签名
 * @param string $class 执行类名
 * @param string $method 类方法名
 * @param null $template 附加标签内容
 */
\Duxravel\Core\Util\Blade::make(string $name, string $class, string $method, $template = null);


/**
 * 循环标签
 * 模板中通过 @name([...]) @endname 使用
 * @param string $name 标签名
 * @param string $class 执行类名
 * @param string $method 类方法名
 * @param null $template 附加标签内容
 */
\Duxravel\Core\Util\Blade::loopMake(string $name, string $class, string $method, $template = null);
```

## Excel 工具

封装了 [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet) 的方法提供了常用操作。

```php
/**
 * excel 导入
 * @param $url 文档url
 * @param $start 起始行数
 * @return array
 */
\Duxravel\Core\Util\Excel::import($url, $start = 1)

/**
 * excel 导出
 * @param $title 表格标题
 * @param $subtitle 表格副标题
 * @param $label 列名
 * @param $data 行数据
 */
\Duxravel\Core\Util\Excel::export($title, $subtitle, $label, $data)
```

## 自定义表单

提供自定义表单调用的常用操作。

```php
/**
 * 获取表单后台UI
 * @param $formId 表单id
 * @param $form 表单类
 * @param int $id 关联id
 * @param string $hasType 关联类型
 * @return mixed
 */
\Duxravel\Core\Util\Form::getFormUI($formId, $form, $id = 0, $hasType = '')

/**
 * 保存表单数据
 * @param int $formId 表单id
 * @param array|object $data 表单数据
 * @param int $id 关联id | 数据id
 * @param string $hasType 关联类型
 * @return bool
 */
\Duxravel\Core\Util\Form::saveForm(int $formId, $data, int $id = 0, string $hasType = '')

/**
 * 删除表单数据
 * @param int $id 关联id | 数据id
 * @param string $hasType 关联类型
 * @return bool
 */
Duxravel\Core\Util\Form::delForm($id, string $hasType = '')
```

## 数组转树形

```php
/**
 * 数组转树形
 * @param array $list 数组数据
 * @param string $id 主键字段
 * @param string $pid 上级字段
 * @param string $son 子级名
 * @return array
 */
\Duxravel\Core\Util\Tree::arr2tree(array $list, string $id = 'id', string $pid = 'pid', string $son = 'sub')

/**
 * 数组转表格树
 * @param array $list 数据列表
 * @param string $id 主键字段
 * @param string $pid 上级字段
 * @param string $name 名称字段
 * @return array
 */
\Duxravel\Core\Util\Tree::arr2table(array $list, string $id = 'id', string $pid = 'pid', string $name = '')

/**
 * 数组转路径
 * @param array $data 数组数据
 * @param int $parentId 上级id
 * @param string $id 主键字段
 * @param string $pid 上级字段
 * @return array
 */
\Duxravel\Core\Util\Tree::arr2path(array $data, int $parentId, string $id = 'id', string $pid = 'pid')

/**
 * 获取子id
 * @param $data 数组数据
 * @param string $id 主键字段
 * @return array
 */
\Duxravel\Core\Util\Tree::allIds($data, string $id = 'id')
```

## 文件上传

调用该方法可以上传外部文件并返回上传后信息。

```php
/**
 * @param $hasType 关联类型
 * @param array $config 上传配置
 * @param int $dirId 目录id
 * @param string $driver 上传驱动
 * @return array
 */
\Duxravel\Core\Util\Upload::load($hasType, $config = [], $dirId = 0, $driver = '');
```