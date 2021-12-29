---
sidebar_position: 2
title: 文章应用
---

## 应用说明

Article 提供了基本的文章管理功能，该应用依赖于 `duxravel-cms` 应用，使用前请先安装依赖应用。

## 安装方法

```bash
// 发行版
composer require duxphp/duxravel-article
// 开发版
composer require duxphp/duxravel-article dev-main
```

如果自动安装失败请手动安装数据
```bash
php artisan app:install duxphp/duxravel-article
```

## 文章列表

基础标签模板如下：

```html
@article()
<div>{{ $item->title }}</div>
<div>{!! $item->content !!}</div>
@endarticle
```

输出后的内容：

```html
<div>文章标题</div>
<div><p>文章内容</p></div>
```

可以为循环列表指定参数：

```html
@article(['参数1' => 参数值2, '参数2' => 参数值2])
<li>{{$item->title}}</li>
@endarticle
```

支持参数如下：

| 参数    | 示例值 | 说明                                                         |
| ------- | ------ | ------------------------------------------------------------ |
| class   | 1      | 分类 id                                                      |
| sub     | true   | 查询分类下子分类内容                                         |
| limit   | 10     | 查询条数                                                     |
| offset  | 2      | 从第几条开始查询                                             |
| model   | 1      | 模型 id                                                      |
| image   | true   | 是否图片文章                                                 |
| page    | true   | 是否分页，一个页面只能使用一个分页列表                       |
| attr    | 1      | 文章属性 id                                                  |
| keyword | '中国' | 全文搜索查询                                                 |
| tag     | '中国' | tag 标签名                                                   |
| sort    | 'view' | 排序条件 支持 默认 `id` 大到小排序 、 浏览量 `view` 大到小排序 |

循环内可调用字段如下：

| 参数        | 示例值                                               | 说明                                                         |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| title       | '我爱中国'                                           | 文章标题                                                     |
| keyword     | '中国,爱中国'                                        | 文章关键词                                                   |
| description | '我爱中国描述'                                       | 文章描述                                                     |
| image       | 'http://localhost/upload/xxx.jpg'                    | 文章封面图                                                   |
| auth        | 'duxphp'                                             | 文章作者                                                     |
| content     | -                                                    | 文章 html 内容                                               |
| view        | 10                                                   | 文章浏览量                                                   |
| created_at  | '2021-01-01'                                         | 创建时间，可使用 `$item->created_at->format('Y-m-d H:i:s')`，格式化时间 |
| class       | [ ['name' => '公告', ...], ['name' => '新闻', ...] ] | 文章栏目信息，一个文章属于多个栏目，栏目信息为数组，可以通过循环标签循环，也可以直接调用第 x 个栏目信息如：`$item->class[0]->name` |

## 分类列表

基础标签模板如下：

```html
@articleclass()
<li>
  {{$item->name}}
  <ul>
    查询子分类 @foreach ($item->children as $vo)
    <li>{{$vo->name}}</li>
  </ul>
</li>
@endarticleclass
```

可以为循环列表指定参数：

```html
@articleclass(['参数1' => 参数值2, '参数2' => 参数值2])
<li>{{$item->name}}</li>
@articleclass
```

支持参数如下：

| 参数     | 示例值 | 说明                      |
| -------- | ------ | ------------------------- |
| id       | 1      | 指定分类 id               |
| limit    | 10     | 查询条数                  |
| model    | 1      | 模型 id                   |
| sub      | 1      | 查询子分类，父级分类 id   |
| parent   | 1      | 查询上级分类，当前分类 id |
| siblings | 1      | 查询兄弟分类，当前分类 id |

循环内可调用字段如下：

| 参数    | 示例值                            | 说明       |
| ------- | --------------------------------- | ---------- |
| name    | '公告'                            | 栏目名称   |
| subname | '新闻公告'                        | 栏目副名称 |
| image   | 'http://localhost/upload/xxx.jpg' | 栏目封面图 |
| content | -                                 | 栏目介绍   |

## 文章分页

可在使用了分页 `page` 参数的文章列表标签之后，使用该标签输出分页：

```html
<div>@paginate('paginate')</div>
```

## 列表页面

在文章页面 `http://localhost/article/list/1` 中可使用的页面标签。

```html
{{$classInfo->name}}
```

该标签可调用字段请参考`分类列表`可用字段。

## 文章页面

在文章页面 `http://localhost/article/info/1` 中可使用的页面标签。

```html
{{$info->title}} {{$classInfo->name}}
```

该标签可调用字段请参考`文章列表`可用字段和`分类列表`可用字段。

## 关联表单

在文章模型中如果关联表单在文章中填写表单的字段，可以使用以下标签输出表单的自定义字段：

```unknown
@article()
<div>{{ $item->form->data->字段名 }}</div>
@endarticle
```
