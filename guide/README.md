## 产品介绍

duxravel，名称由 dux 与 laravel 组合而来，是一款以 laravel 框架为基础的开源后台管理系统，您可以以它为基础开发任意网站、API接口、内部管理系统等 web 应用。

## 产品特点

- 📦 开箱即用，快速搭建基础应用
- 📱 模块化开发，即插即用超低耦合
- 📋  Arco Design UI库，美观易用的操作体验
- 💥 微前端封装，实时编译 sfc 模板
- 🏷  命令行脚手架，一键生成应用模块
- 🎨  基于路由的权限，减少繁琐的权限配置

## 快速开始

请先确保预安装  PHP 7.4+ 、 Composer 2.*与 Mysql 5.6+ 环境

```bash
// 创建站点目录
mkdir project && cd project

// 在线下载系统
composer create-project duxphp/duxravel
```

## 本地预览

通过 laravel 内置服务启动本地服务器，也可以根据本地环境自行指向运行目录到 `public` 目录

```bash
php artisan serve
```

启动完成后请根据提示访问本地 Url 地址系统会自动进入安装向导

## 系统升级

系统的内置模块都是通过 composer 进行包管理只需要更新 composer 包即可升级到最新版本

```bash
composer update
```

执行包更新命令后执行以下命令升级数据库

```
php artisan migrate
```

## 项目赞助

如果你觉得这个项目对你有所帮助你可以请我们喝杯咖啡，我们定期会将赞助人名单公布在此处。

![alipay](../_media/alipay.jpg ':size=300')