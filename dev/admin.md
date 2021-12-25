## 控制器生成

为了规范化开发，后台控制器默认存放在应用目录下 `Admin` 目录，请使用以下命令生成基本控制器，`test` 为应用的名称。

```shell
$ php artisan app:make-admin test
```

控制基础示例代码如下：

```php
<?php
namespace Modules\Test\Admin;

use Duxravel\Core\UI\Form;
use Duxravel\Core\UI\Table;

class Test extends \Modules\System\Admin\Expend
{

    public string $model = \Modules\Test\Model\Test::class;

    protected function table(): Table
    {
        $table = new Table(new $this->model());
        // 表格组件
        return $table;
    }

    public function form(int $id = 0): Form
    {
        $form = new Form(new $this->model());
        // 表单组件
        return $form;
    }
}
```

## 继承类

后台控制器继承了后台公共类，该继承类封装了常用的增删查改相关功能，开发者只需要编写表格与表单方法并定义路由功能即可实现常用的操作功能。

后台控制器可以继承以下 2 个类，命令生成的控制器默认继承了扩展控制器。

- 公共控制器

  实现了视图输出，模板赋值等基本功能。

  ```php
  class Test extends \Modules\System\Admin\Common
  ```

- 扩展控制器

  实现了常规的增删查改等封装操作，只需定义 `表格` 与 `表单` 方法，扩展控制器继承于公共控制器。

  ```php
  class Test extends \Modules\System\Admin\Expend
  ```

最上层控制器则继承了 laravel 的 `Illuminate\Routing\Controller` 控制器类，具体方法请自行查阅 laravel 文档。

## 公共控制器

### 模板赋值

```php
/**
 * 模板赋值
 * @param $name 变量名
 * @param $value 变量值
 */
$this->assign($name, $value);
```

### 系统视图

该方法使用布局方式显示自定义模板内容，模板内容为标准的 vue 单页内容。

```php
/**
 * 系统视图
 * @param $tpl 模板路径： 不填写默认自定识别应用下 View/Admin 目录下模板
 */
return $this->systemView(string $tpl = '');
```

### 弹窗节点

该方法为弹窗使用的前端节点方法

```php
/**
 * 弹窗视图
 * @param string $title
 * @param array  $node
 */
return $this->dialogNode(string $title = '', array $node = [])
```

## 扩展控制器

### 表格列表

该方法调用开发者定义的 `table` 方法作为列表页面显示。

```php
public function index()
```

### ajax 列表数据

如果表格类型为 ajax 加载数据则会请求该方法对应的路由。

```php
public function ajax()
```

### 表单页面

添加、编辑页面均指向该方法，该方法调用开发者定义的 `form` 方法作为表单页面显示，通过路由传递 `id` 参数做添加和编辑依据。

```php
public function page($id = 0)
```

### 数据保存

添加、编辑表单页面的提交方法，通过路由传递 `id` 参数做新增和更新依据。

```php
public function save($id = 0)
```

### 数据删除

根据 `id` 参数进行删除数据。

```php
public function del($id = 0)
```

### 数据恢复

根据 `id` 参数进行恢复数据，需模型使用软删除功能。

```php
public function recovery($id = 0)
```

### 彻底删除

根据 `id` 参数进行彻底删除，需模型开启软删除功能。

```php
public function clear($id = 0)
```

### 状态切换

根据 `id` 参数确定更改条目，可修改单条数据状态或字段值。

```php
/**
 * 状态切换
 * method post
 * params id 可选，条目主键值，可通过参数或 post 传递
 * params field 可选，更新字段，默认为status
 * params value  必填，更新值，根据传递内容
 */
public function status($id = 0)
```

### 数据查询

通过 get 请求查询模型对应的分页数据。

```php
/**
 * 数据查询
 * method get
 * params query 可选，搜索关键字
 * params limit 可选，查询条目数量，默认10
 * params id  可选，指定主键值，可为数组或者逗号分割
 */
public function data()
```

## 扩展控制器接口

继承扩展控制器后可以使用以下方法去定义继承方法。

### 获取数据

该方法为表格数据为集合的类型使用，可以使用该方法获取提交后数据

```php
/**
 * 获取提交数据
 * params $data 保存后数据
 * params $id  主键值
 */
public function storeData($data, $id)
```

### 删除数据

该方法为删除数据前调用的方法。

```php
/**
 * 删除数据
 * params $id  主键值
 */
public function delData($id = 0)
```

### 彻底删除

该方法为彻底删除数据前调用的方法。

```php
/**
 * 彻底删除数据
 * params $id  主键值
 * params $info  数据对象
 */
public function clearData(($id, $info)
```

### 数据查询

数据查询拥有以下多种接口方法：

#### 搜索字段

指定搜索字段

```php
public function dataSearch() {
    return ['name'];
}
```

#### 查询条件

自定查询条件

```php
public function dataWhere($query) {
    return $query;
}
```

#### 查询字段

指定输出字段，指定默认输出 `id` 与 `name` 字段

```php
public function dataField() {
    return ['title as name', 'image'];
}
```

#### 管理 Url

定义该方法时可返回每条数据的管理 url

```php
public function dataManageUrl($item) {
    return route('admin.article.article.page', ['id' => $item->article_id]);
}
```

#### 访问 Url

定义该方法时可返回每条数据的访问 url

```php
public function dataInfoUrl($item) {
    return route('web.article.info', ['id' => $item->article_id]);
}
```

## 路由定义

后台路由均以 url 的 `admin/`做前缀，后台路由分为授权路由和非授权路由两个类型。

- 授权路由需要登录后才用户可以使用，请将路由配置放置在应用目录 `Route/AuthAdmin.php` 文件。
- 非授权路由不需要登录可以使用，请将路由配置放置在应用目录 `Route/Admin.php` 文件。

### 授权路由

授权路由中包含了权限验证的设置，一个完整的后台控制器路由规则的实现如下，`auth_app` 与 `auth_group` 分别代表权限设置中的应用名和模块名，路由的 `desc` 代表该路由对应功能的描述。

```php
<?php


use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => 'test',             // 应用 url 前缀
    'auth_app' => '测试应用'         // 应用名称
], function () {
    Route::group([
        'auth_group' => '测试功能'  // 功能名称
    ], function () {
        Route::get('test', ['uses' => 'Modules\Test\Admin\Test@index', 'desc' => '列表'])->name('admin.test.test');
        Route::post('test/ajax', ['uses' => 'Modules\Test\Admin\Test@ajax', 'desc' => '列表数据'])->name('admin.test.test.ajax');
        Route::post('test/data', ['uses' => 'Modules\Test\Admin\Test@data', 'desc' => '查询数据'])->name('admin.test.test.data');
        Route::get('test/page/{id?}', ['uses' => 'Modules\Test\Admin\Test@page', 'desc' => '表单'])->name('admin.test.test.page');
        Route::post('test/store/{id?}', ['uses' => 'Modules\Test\Admin\Test@store', 'desc' => '保存'])->name('admin.test.test.store');
        Route::post('test/del/{id?}', ['uses' => 'Modules\Test\Admin\Test@del', 'desc' => '删除'])->name('admin.test.test.del');
        Route::post('test/recovery/{id?}', ['uses' => 'Modules\Test\Admin\Test@recovery', 'desc' => '恢复'])->name('admin.test.test.recovery');
        Route::post('test/clear/{id?}', ['uses' => 'Modules\Test\Admin\Test@del', 'desc' => '清空'])->name('admin.test.test.clear');
        Route::post('test/status/{id?}', ['uses' => 'Modules\Test\Admin\Test@status', 'desc' => '状态'])->name('admin.test.test.status');
    });
    // Generate Route Make
});
```

以上代码将每个路由指向到了后台控制器的不同方法，我们还可以使用封装类来简化路由的设置。

```php
<?php


use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => 'test',             // 应用 url 前缀
    'auth_app' => '测试应用'         // 应用名称
], function () {
    Route::group([
        'auth_group' => '测试功能'  // 功能名称
    ], function () {
        Route::manage(\Modules\Test\Admin\Test::class)->only(['index', 'data', 'page', 'save', 'del', 'recovery', 'clear', 'status'])->make();
    });
    // Generate Route Make
});
```

扩展控制器因包含了自动化 url 功能，路由命名请遵循以下规则命名，同时可以开发人员快速定位控制器文件。

```unknown
// url 命名
控制器名/方法名/参数
```

路由别名为完整的路径，使用 `route` 函数调用 url，应用内所有的 url 获取请使用 `route` 函数，防止因 url 变更导致路由失效。

```unknown
// 路由别名
admin.应用名.控制器名.方法名
```

使用后台授权路由编写的路由规则，最终会生成以下完整的 url 地址

```unknown
http://localhost/admin/test
http://localhost/admin/test/ajax
http://localhost/admin/test/data
http://localhost/admin/test/page/1
...
```

### 非授权路由

非授权路由与普通路由定义一致，主要用于登录、注册等特殊非授权功能。

非授权路由与授权路由统一 url 为 `admin/` 前缀，路由别名请定义 `admin.` 开头别名。