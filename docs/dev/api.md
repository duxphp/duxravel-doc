---
sidebar_position: 5
title: Api控制器(api 层)
---

:::tip 接口说明
Api 接口主要用于对外提供相关应用功能接口，如第三方系统接入、前端 `MVVM` 模式开发等。
:::

## 继承类

接口类请继承以下基础控制器类：

```php
class Test extends Duxravel\Core\Api\Api
```

接口类基础示例代码如下：

```php
<?php
namespace Modules\Test\Api;

class Test extends Duxravel\Core\Api\Api
{
    public function index()
    {
        return $this->success();
    }
}
```

继承基础控制器后可以使用一些扩展方法调用。

## 继承方法

### 成功消息

成功失败消息均封装自 [laravel-response](https://github.com/Jiannei/laravel-response)，更多使用方法请查阅文档。

```php
/**
 * 成功消息
 * @param $data 消息数据
 * @param $message 消息内容
 * @param $code 状态码
 * @param $headers 头数据
 */
return $this->success($data = null, $message = '', $code = 200, $headers = [], $option = 0);
```

### 错误消息

```php
/**
 * 异常消息
 * @param $message 消息内容
 * @param $code 状态码
 * @param $headers 头数据
 * @param $errors 错误数据
 * @param $options 屏蔽错误数据
 */
return $this->error($message = '', $code = 500, $errors = null, $header = [], $options = 0);
```

## 路由定义

Api 路由以前缀为 `/api` 的格式，如 `http://localhost/api/demo/test`。

请将路由配置放置在应用目录 `Route/Api.php` 文件中，示例如下：

```php
<?php
use Illuminate\Support\Facades\Route;

Route::get('test/list', ['uses' => 'Modules\Article\Api\Article@index', 'desc' => '测试列表'])->name('api.demo.test');
```

请填写应用描述，以便与后台创建的接口账号可以进行权限设置。

路由别名请使用 `api.应用名.功能名.方法名` 格式定义。

最终生成的 url 参考如下：

```unknown
http://localhost/api/demo/test/list
```

## 资源类

资源类主要用于定义接口返回模型的数据格式，和返回字段等定义同时可作为嵌套和复用类。

资源类继承与 laravel 的[资源控制器](https://learnku.com/docs/laravel/8.x/controllers/9368#068f11)，更多方法请查阅文档。

接口资源类需自己手动建立类，请将类建立至应用目录下的 `Resource` 子目录。

### 资源类继承

资源类请继承以下基础控制器类：

```php
class TestResource extends Duxravel\Core\Resource\BaseResource
```

示例如下：

```php
<?php
namespace Modules\Test\Resource;

use Duxravel\Core\Resource\BaseResource;

class TestResource extends BaseResource
{
    public function toArray($request): array
    {
        return [
            'title' => $this->title,
            'content' => $this->content
        ];
    }
}
```

集合资源类请继承以下基础控制器类。

集合资源可以使用 `$this->collection` 方法来获取单资源数据，前置命名需一致。

```php
class TestCollection extends Duxravel\Core\Resource\BaseCollection
```

示例如下：

```php
<?php

namespace Modules\Test\Resource;

use Duxravel\Core\Resource\BaseCollection;

class TestCollection extends BaseCollection
{

    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'custom' => 'field' // 定义字段
        ];
    }
}
```

### 资源类使用

定义好资源类后我们可以直接`实例化`资源类作为接口返回。

```php
<?php
namespace Modules\Article\Api;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Test\Resource\TestCollection;
use \Modules\Test\Resource\TestResource;
use Duxravel\Core\Api\Api;

class Test extends Api
{
    public function index()
    {
        $model = new \Modules\Test\Model\Test();
        // 数据集合资源
        return $this->success((new TestCollection($model->paginate())));
    }

    public function info($id = 0)
    {
        $model = new \Modules\Test\Model\Test();
        // 数据资源
        return $this->success((new TestResource($model)));
    }
}
```

### 扩展方法

我们可以在实例化资源类后使用扩展方法满足灵活使用的需求。

#### 隐藏字段

```php
$resource->hide(['conent']);
```

#### 仅显示指定字段

```php
$resource->show(['title']);
```

#### 字段分类

用于不同定义类型处理不同的字段格式

```php
$resource->type('edit');
```

需要在实例化的资源类中定义字段属性

```php
public function toArray($request)
{
    if ($this->type == 'edit') {
        return $this->filterFields([
            'id' => hashid_encode($this->id),
        ]);
    }
    return $this->filterFields([
        'id' =>$this->id,
    ]);
}
```

## 接口请求

请在后台中的设置 - 接口授权功能中添加一条授权记录获取 `SECRET_ID` 与 `SECRET_KEY` 用于接口请求。

### 请求参数

接入者可以使用 http 的 `get`、`post` 等请求作为请求方式，请求参数格式如下：

#### 请求 url

post|get http(s)://localhost/api/应用名/类名/方法名/参数...

#### 请求 headers

| 名称          | 示例                             | 说明                           |
| ------------- | -------------------------------- | ------------------------------ |
| Accept        | application/json                 | 返回类型                       |
| Content-MD5   | 1ED5ED64ED37F4F73E8F018187AF450E | 数据签名                       |
| Content-Date  | 1624942695                       | 当前请求时间戳                 |
| AccessKey     | 123456                           | 后台创建的 SECRET_ID           |
| Authorization | Bearer xxxx                      | 用户授权 token (JWT授权时需要) |

#### 请求 body

请求 body 类型可以为 `formdata` 或 `json` 等数组或对象类型。

### 数据签名

为了保证提交的数据不被篡改，请使用 `https` 作为 api 服务， 请将请求 url、时间戳与接口秘钥进行签名并传入 `Content-MD5` 中，签名基本格式如下：

```http
md5('url=当前请求完整url' + '&timestamp=当前请求时间戳' + '&key=后台SECRET_KEY')
```

签名后请将签名结果转换为大写，并保证请求时间戳在 `headers` 中的 `Content-Date` 参数一致，时差过大将会验证失败。

### 签名示例

以下签名示例使用 `apifox` 作为签名示例脚本，第三方开发者可根据自己使用的语言自行编写。

```js
// 获取预先设置为环境变量的 APPKEY
let key = pm.environment.get('SECRET_KEY');
let token = pm.environment.get('TOKEN');
let url = pm.request.url;


// 数据签名
let timestamp = Math.round(new Date().getTime() / 1000);
signString = 'url=' + url + '&timestamp=' + timestamp + '&key=' + key;
let sign = CryptoJS.MD5(signString)
  .toString()
  .toUpperCase();


// 设置 header 信息
var headers = pm.request.headers;


headers.upsert({
  key: 'Content-MD5',
  value: sign,
});
headers.upsert({
  key: 'Content-Date',
  value: timestamp.toString(),
});
headers.upsert({
  key: 'AccessKey',
  value: pm.environment.get('SECRET_ID'),
});


// 加入用户 token (JWT授权时需要)
headers.upsert({
  key: 'Authorization',
  value: 'Bearer ' + token,
});
```