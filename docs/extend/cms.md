---
sidebar_position: 1
title: CMS 应用
---

## 应用说明

CMS 提供了基本的 Web 站点功能，同时提供了自定义菜单、内容标签、模板标记、自定义页面、自定义表单提交等基础功能与 对应的 Api 接口。

## 安装方法

```bash
// 发行版
composer require duxphp/duxravel-cms
// 开发版
composer require duxphp/duxravel-cms dev-main

// 执行安装
php artisan app:install duxphp/duxravel-cms
```

## 模板功能

标签使用 laravel 的 [badge 模板](https://learnku.com/docs/laravel/8.x/blade/9377) 标签，您可以查看该文档使用常规的操作，web 前台模板放置在 `public/theme`目录内，请根据后台设置来设置默认模板目录。

### 模板继承

模板继承主要用于模板公用，首先我们建立一个 `公共模板` 比如头部和底部：

模板文件名为 `layout.blade.php`。

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{$meta->title}}</title>
    <meta name="Keywords" content="{{$meta->keywords}}" />
    <meta name="Description" content="{{$meta->description}}" />
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script src="//unpkg.com/alpinejs" defer></script>
  </head>
  <body>
    <h1>这里是展示</h1>


    <header>@yield('header')</header>


    <main>@yield('content')</main>


    <footer>@yield('footer')</footer>
  </body>
</html>
```

然后我们建立一个首页模板作为继承模板的演示：

模板文件名为 `index.blade.php`。

```blade
@extends('layout')


@section('header', '这里是头部插槽')


@section('content')
这里是内容插槽
@endsection


@section('footer')
这里是底部插槽
@endsection
```

其中 `layout` 为 `layout.blade.php` 文件的文件名。

简单理解相当于我们建立一个公共模板在公共模板上面标记`@yield`插槽，然后在编写模板的时候引入`@extends`该公共模板然后通过 `@section` 在插槽内插入内容或者 html。

### 显示变量

开发者可以使用变量标签进行内容输出，变量为页面定义的变量。

```blade
你好，{{ $name }}
```

二维数组标签

```blade
你好，{{ $item->title }}
```

### 显示 html

如果变量内容为 html 使用该标签进行输出。

```blade
{!! $content !!}
```

### 判断标签

常用判断标签。

```blade
@if ($num == 1)
如果数量等于1
@elseif ($num > 1)
如果数量大于1
@else
如果数量小于1
@endif
```

### 循环标签

用于数组或对象数组循环。

```blade
@foreach ($items as $item)
<p>{{$item->name}}</p>
@endforeach


@foreach ($items as $item)
@if ($loop->first)
  循环第一个显示
@endif


@if ($loop->last)
  循环最后一个显示
@endif

<p>{{$item->name}}</p>
@endforeach
```

### 标题关键词

每个页面均可使用该标签统一调用。

```blade
<title>{{$meta->title}}</title>
<meta name="Keywords" content="{{$meta->keywords}}" />
<meta name="Description" content="{{$meta->description}}" />
```

### 模板路径

可以使用 theme 变量函数调用当前模板内资源。

```blade
<script src="{{$theme('js/app.js')}}"></script>
```

### 模板路径

可以使用 theme 变量函数调用当前模板内资源。

```blade
<script src="{{$theme('js/app.js')}}"></script>
<link rel="stylesheet" href="{{$theme('css/style.css')}}" />
```

## 菜单标签

对应后台工具中的菜单调用标签

### 标签方法

基础标签模板如下：

```html
@menu()
<div>{{ $item->name }}</div>
<div>{{ $item->url }}</div>
@endmenu
```

输出后的内容：

```html
<div>菜单名</div>
<div>http://localhost/</div>
```

可以为循环列表指定参数：

```html
@menu(['参数1' => 参数值2, '参数2' => 参数值2])
<li>{{$item->name}}</li>
@endmenu
```

支持参数如下：

| 参数   | 示例值 | 说明        |
| ------ | ------ | ----------- |
| id     | 1      | 菜单 id     |
| parent | 1      | 上级数据 id |
| limit  | 10     | 查询条数    |

循环内可调用字段如下：

| 参数 | 示例值                                          | 说明     |
| ---- | ----------------------------------------------- | -------- |
| name | '中国'                                          | 菜单名   |
| url  | '[http://www.china.com](http://www.china.com/)' | 菜单链接 |

### 子菜单

默认输出顶级菜单，可以使用以下内循环来输出子菜单：

```html
@menu()
<ul>
  {{ $item->name }} @foreach ($item->children as $vo)
  <li>{{ $vo->name }}</li>
</ul>
@endmenu
```

## 表单标签

对应后台应用中的自定义独立表单功能标签

### 表单列表

基础标签模板如下：

```html
@form()
<div>{{ $item->name }}</div>
@endform
```

输出后的内容：

```html
<div>自定义字段值</div>
```

可以为循环列表指定参数：

```html
@form(['参数1' => 参数值2, '参数2' => 参数值2])
<li>{{$item->title}}</li>
@endform
```

支持参数如下：

| 参数  | 示例值 | 说明     |
| ----- | ------ | -------- |
| id    | 1      | 表单 id  |
| page  | true   | 是否分页 |
| limit | 10     | 查询条数 |

循环内字段为表单设计器中定义字段。

### 列表分页

默认输出顶级菜单，可以使用以下内循环来输出子菜单：

```html
@menu()
<ul>
  {{ $item->name }} @foreach ($item->children as $vo)
  <li>{{$vo->name}}</li>
</ul>
@endmenu
```

### 列表页面

在列表页面 `http://localhost/form/list/1` 中可使用的页面标签。

```html
{{$formInfo->name}}
```

### 详情页面

在详情页面 `http://localhost/form/info/1` 中可使用的页面标签。

```html
{{$info->自定义字段}} {{$formInfo->name}}
```

### 表单提交

开发者可自行编写表单 html 元素用于表单提交，表单提交需要满足以下条件：

- 表单设置中打开`独立管理`
- 表单设置中打开`外部提交`

基础表单 html 如下：

```html
<form
  method="post"
  enctype="multipart/form-data"
  action="{{route('web.form.push', ['id' => 1])}}"
>
  <h3>文本框</h3>
  <input name="title" type="text" />


  <h3>单选</h3>
  <label><input name="title" type="radio" value="选项一" /> 选项一</label>
  <label><input name="title" type="radio" value="选项二" /> 选项二</label>


  <h3>单图片上传</h3>
  文件：<input name="images" type="file" />


  <h3>多图片上传</h3>
  文件：<input name="images[]" type="file" /> 文件：<input
    name="images[]"
    type="file"
  />
  文件：<input name="images[]" type="file" />


  <h3>验证码</h3>
  <div>
    <img src="{{ captcha_src() }}" /> <input type="text" name="captcha" />
  </div>


  <input type="hidden" name="_token" value="{{csrf_token()}}" />
  <button type="submit" name="check">提交</button>
</form>
```

其中 `action` 中 `url`参数为表单 id，表单中含有隐藏字段 `_token` 用于 `csrf` 验证，同时必须填写图形验证码，图形验证码可以通过刷新页面或 ajax 请求 `http://localhost/captcha/api/math` 进行刷新。

## 标记输出

通过后台工具添加的标记可以通过该标签输出：

```blade
@marker(['id' => 1])
```

还可以使用标记名输出内容：

```blade
@marker(['name' => '标记'])
```

## 自定义页面

自定义页面标签主要用于定制灵活的页面，相当于一个空页面，您可以在该页面放置各种类型标签。

在页面 `http://localhost/page/1` 中可使用的页面标签。

```html
{{$info->name}}
```