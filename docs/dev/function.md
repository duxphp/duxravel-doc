---
sidebar_position: 11
title: 常用函数
---

## 成功消息

当执行一个行为成功后需要给外部通知消息。

:::tip 提醒
该方法 url 跳转只能用于系统内部路由跳转，由前端进行异步加载跳转页面。

成功与失败消息均基于 [laravel-response](https://github.com/Jiannei/laravel-response) 做封装
:::



```php
/**
 * 成功消息
 * @param string $msg 消息内容
 * @param array $data 消息数据
 * @param string $url 跳转 url
 * @param int $code 状态码
 */
return app_success(string $msg = '', array $data = [], string $url = '', int $code = 200)
```

返回消息格式如下，后台前端框架已对返回请求进行封装操作。

```json
{
  "status": "success",
  "code": 200,
  "message": "操作成功",
  "data": {
    "data": [
      {
        "nickname": "Joaquin Ondricka",
        "email": "lowe.chaim@example.org"
      },
      {
        "nickname": "Jermain D'Amore",
        "email": "reanna.marks@example.com"
      },
      {
        "nickname": "Erich Moore",
        "email": "ernestine.koch@example.org"
      }
    ]
  },
  "error": {}
}
```

## 错误消息

当执行一个行为失败后需要给外部通知消息，该消息无需返回会自动中断后续进程。

```php
/**
 * 错误消息
 * @param string $msg 消息内容
 * @param int $code 状态码
 * @param string $url 跳转 url
 */
app_error($msg, int $code = 500, string $url = '')

/**
 * 满足条件输出错误消息
 * @params bool $boolean 判断结果
 * @param string $msg 消息内容
 * @param int $code 状态码
 * @param string $url 跳转 url
 */
app_error_if($boolean, $msg, int $code = 500, string $url = '')
```

返回消息格式如下：

```json
{
  "status": "fail",
  "code": 500,
  "message": "操作失败",
  "data": {},
  "error": {}
}
```

## 应用解析

解析当前访问应用的名称、层名、类名、方法名

```php
/**
 * 获取应用解析
 * @param string $key 获取指定值
 * @return array|string
 */
app_parsing(string $key = '');
```

## 文件大小单位转换

将字节数量根据大小转换成 `kb`、`mb`等单位。

```php
/**
  * 文件大小转换
  * @param $num 字节
  * @return string
*/
app_filesize($num);
```

## 应用路径获取

获取 `modules` 中的路径

```php
/**
  * 文件大小转换
  * @param $path 应用内路径
  * @return string
*/
module_path($path = '');
```

## 纯数字 guuid

```php
/**
  * uuid获取
  * @param $len 随机数长度
*/
get_uuid($len = 0);
```

## html 转文本

```php
/**
  * html转文本
  * @param $html html内容
  * @param $len 文本长度
*/
html_text($html, $len = 0);
```

## 文件转类名

将应用内绝对路径文件转换为类名

```php
/**
  * 文件转类名
  * @param $file 文件路径
*/
file_class($file);
```

## 更多函数
:::tip 提醒
系统内的函数存放在 `duxravel-app` 包中，可以查看以下函数文件了解具体实现。
:::


```
vendor/duxphp/duxravel-app/src/core/Util/Function.php
```

