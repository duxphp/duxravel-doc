## 基本说明

目前开发的应用可以提交在 [packagist](https://packagist.org/) 中，应用如果要进行打包安装分为 2 种形式：

- 应用打包 - 使用 `composer` 自定义 `type` 类型，安装后的代码存放在 `modules` 目录内。
- 扩展打包 - 使用 `composer` 的 `extra` 扩展参数，安装后的代码存放在 `vendor` 目录内。
- 自由打包 - 使用压缩包直接打包应用数据并进行分享。

## 应用打包

开发者开发的应用存放在 `modules` 下子目录，如果需要将该应用打包提供给他人安装使用则需要进行以下操作。

### 建立 git 仓库

新建 git 仓库，在仓库模板中建立 `composer.json` 文件，并按照以下模板修改。

```json
{
  "name": "duxphp/duxravel-name", // packagist 中的路径，根据需要自定义，一般按照规则： 作者/duxravel-功能
  "type": "duxravel-app", // 包类型请勿修改
  "description": "应用描述", // 应用描述
  "authors": [
    // 作者信息，请自定义
    {
      "name": "duxphp",
      "email": "admin@duxphp.com"
    }
  ],
  "license": "MIT", // 开源协议
  "require": {
    // 依赖库
    "php": ">=7.4"
  },
  "extra": {
    "duxravel": {
      "name": "Demo" // 应用名，安装后在 modules 目录下的目录名
    }
  }
}
```

### 放置应用文件

将应用内的全部文件和目录放置在 git 仓库的根目录中，形式如下：

```
Admin
Model
Route
Service
View
...
composer.json
```

### 数据表迁移

在 git 仓库根目录中建立 `Database` 目录用于存放该应用的数据表结构和填充数据，具体数据结构和数据填充类请查阅 laravel 的数据迁移文档。

### 发布应用

提交代码到线上 git 仓库，并在 [packagist](https://packagist.org/packages/submit) 中提交 composer 扩展包。

备份应用后删除当前项目 `modules` 下的应用目录，并删除相关数据表。

并使用以下命令安装测试线上应用。

```shell
$ composer require xxxx/xxxx dev-main
```

具体的 `require` 命令请查看 packagist 发布后的地址。

## 扩展打包

### 建立 git 仓库

新建 git 仓库，在仓库模板中建立 `composer.json` 文件，并按照以下模板修改。

```json
{
  "name": "duxphp/duxravel-name", // packagist 中的路径，根据需要自定义，一般按照规则： 作者/duxravel-功能
  "type": "library",
  "description": "应用描述", // 应用描述
  "authors": [
    // 作者信息，请自定义
    {
      "name": "duxphp",
      "email": "admin@duxphp.com"
    }
  ],
  "license": "MIT", // 开源协议
  "require": {
    // 依赖库
    "php": ">=7.4"
  },
  "autoload": {
    "psr-4": {
      "Modules\\": "src"
    }
  },
  "extra": {
    "branch-alias": {},
    "laravel": {
      "providers": [
        "Modules\\Test\\Providers\\TestServiceProvider" // 当前应用服务提供者类
      ]
    },
    "duxravel": {
      "route": [   // 路由接口
        "src/Article/Route/Api.php",
        "src/Article/Route/AuthAdmin.php",
        "src/Article/Route/Web.php"
      ],
      "menu": [   // 菜单接口
        "src/Article/Menu/Admin.php"
      ],
      "listener":[ // 事件接口
        "Modules\\Article\\Listeners\\InstallSeed"
      ]
    }
  },
  "config": {
    "optimize-autoloader": true,
    "sort-packages": true,
    "preferred-install": "dist"
  }
}
```

### 放置应用文件

将应用内的全部文件和目录放置在 git 仓库的 `src` 目录中，并将数据迁移文件放置在 `database` 目录中，形式如下：

```
├── README.md
├── composer.json
├── database
│   ├── migrations
│   └── seeders
│       └── DatabaseSeeder.php
└── src
    └── Article
        ├── Admin
        ├── Api
        ├── Config
        ├── Listeners
        ├── Menu
        ├── Model
        ├── Providers
        │   └── ArticleServiceProvider.php
        ├── Resource
        ├── Route
        ├── Service
        └── Web

```



### 数据表迁移

在 git 仓库根目录中建立 `Database` 目录用于存放该应用的数据表结构和填充数据。

### 数据填充

请在 `src` 目录中创建 `Listeners` 目录 并创建 `InstallSeed` 类，模板如下：

```php
<?php
namespace Modules\Test\Listeners;

/**
 * 数据安装接口
 */
class InstallSeed
{

   public function handle($event)
    {
        return \Modules\Article\Seeders\DatabaseSeeder::class;
    }
}
```

该服务的主要作用是运行安装向导时进行数据导入。

### 服务提供者类

请在 `src` 目录中创建 `Providers` 目录 并创建 `ArticleServiceProvider` 类，模板如下：

```php
<?php
namespace Modules\Article\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class ArticleServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Router $router)
    {
        // 注册数据库迁移目录
        $this->loadMigrationsFrom(realpath(__DIR__ . '/../../../database/migrations'));
    }
}
```

在 `boot` 方法中注册数据迁移目录。

### 发布应用

提交代码到线上 git 仓库，并在 [packagist](https://packagist.org/packages/submit) 中提交 composer 扩展包。

备份应用使用以下命令安装测试线上应用。

```shell
$ composer require xxxx/xxxx dev-main
```

具体的 `require` 命令请查看 packagist 发布后的地址。

### 安装数据

引入后请执行以下两条命令更新数据表和数据，命令参数请自行修改。

```shell
$ php artisan migrate
$ php artisan db:seed --class=\\Modules\\Article\\Seeders\\ArticleTableSeeder
```

## 自由打包

请按照 `应用打包` 创建数据迁移目录及文件，进行`zip`打包分享，用户解压后按照原结构放置在 `modules` 目录中，并执行以下命令进行安装和清理缓存。

```shell
$ php artisan app:install test
$ composer run-script post-autoload-dump
```