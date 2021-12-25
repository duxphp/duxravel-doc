## 基础说明

Web 层主要用于传统的`模板`式前台开发和一些开放式的前端输出，如果前端为 `MVVM` 等架构，请使用 `API 接口` 进行开发，前台控制器需要 `duxravel-cms`包的依赖。

## 继承类

控制器请继承以下基础控制器类：

```php
class Article extends Modules\Cms\Web\Base
```

控制器基础示例代码如下：

```php
<?php
namespace Modules\Test\Web;

/**
 * class Test
 * @package Modules\Test\Web
 */
class Test extends \Duxravel\Core\Web\Base
{
}
```

继承基础控制器后可以使用一些扩展方法调用。

## 继承方法

### 模板赋值

```php
/**
 * 模板赋值
 * @param string $name 变量名
 * @param $value 赋值内容
 */
$this->assign(string $name, $value);
```

### 模板视图

使用模板视图可以指定模板名，模板位于主题 `theme` 目录下的子目录。

```php
/**
 * web视图
 * @param string $tpl 模板名
 */
view(string $tpl = '')
```

模板主题可以在`后台/设置/主题`中进行相关设置。

### 模板标签

视图方法继承与 laravel 的 [Blade](https://learnku.com/docs/laravel/8.x/blade/9377) 模板，可以使用该模板的全部标签功能。

视图增加了以下变量，方便模板开发。

#### 主题路径

该变量函数的参数为输出主题目录内的文件 url，在视图输出后会转换为对应 url 地址。

```php
{{ $theme('images/logo.png') }}
```

### 路由定义

Web 路由以站点根目录为基础 url 形式，如 `http://localhost/demo/info/1`。

请将路由配置放置在应用目录 `Route/Web.php` 文件中，示例如下：

```php
<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix'   => 'demo',  // 路由前缀
    'app' => '演示功能'     // 应用描述
], function () {
    Route::group([
        'group' => '测试功能'   // 功能描述
    ], function () {
        Route::get('list/{id?}', ['uses' => 'Modules\Article\Web\Article@index', 'desc' => '列表'])->name('web.demo.list');
        Route::get('info/{id}', ['uses' => 'Modules\Article\Web\Article@info', 'desc' => '详情'])->name('web.demo.info');
    });
    // Generate Route Make
});
```

路由别名请使用 `web.功能名.方法名` 格式定义。

最终生成的 url 参考如下：

```unknown
http://localhost/demo/list/1
http://localhost/demo/info/1
```

模板中输出 `url` 请使用 `route()` 函数用别名做生成，防止因为 url 规则改动导致路由失效。