---
sidebar_position: 1
title: 快速开始
slug: /
---

duxravel，名称由 dux 与 laravel 组合而来，是一款以 laravel 框架为基础的开源后台管理系统，您可以以它为基础开发任意网站、API接口、内部管理系统等 web 应用。


## 安装项目

:::caution 环境要求

请先确保预安装  PHP 7.4+ 、 Composer 2.*与 Mysql 5.6+ 环境
:::

```bash
// 定向到站点目录
cd sites

// 通过 duxravel 创建项目 (稳定版)
composer create-project duxphp/duxravel

// 通过 duxravel 创建项目 (dev版)
composer create-project duxphp/duxravel --stability=dev
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

如果数据库结构未自动同步可以执行以下命令同步

```
php artisan migrate
```
