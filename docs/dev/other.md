---
sidebar_position: 7
title: 服务注册类
---

:::caution 注意
服务注册依赖用服务缓存建立注册文件后请使用 `php artisan app:build ` 命令更新服务缓存或删除 `bootstrap/cache` 目录下文件。
:::

## 应用配置

在应用内可以建立 `Config` 目录，并建立自定义配置文件，加入的文件将会自动注册为全局配置，请使用 `config($key)` 函数获取对应配置信息。

:::tip 提醒
配置文件全局共享，请注意配置文件名是否冲突，建议以应用名命名通过应用名调用配置，应用信息 `Config.php` 不加入全局配置。
:::

## 服务提供者

在普通应用内也可以使用 laravel [服务提供者](https://learnku.com/docs/laravel/8.5/providers/10366) 来注册核心(中间件)等组件。

:::tip 提醒
在应用内建立 `Providers` 目录，在其中建立任意类即可自动执行注册。
:::

示例代码如下：

```php title="modules/Blog/Providers/TestProviders.php"

<?php

namespace Modules\Blog\Providers;

use Illuminate\Support\ServiceProvider;

class TestProviders extends ServiceProvider
{

    public function register()
    {
        // 注册中间件
        $this->app['router']->aliasMiddleware('wechat.oauth', '类名');

        // 分组中间件追加
        $this->app['kernel']->appendMiddlewareToGroup('web', '类名');

        // DD调试
        dd('注册成功');
    }

    public function boot()
    {
    }

}

