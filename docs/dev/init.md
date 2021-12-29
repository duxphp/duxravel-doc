---
sidebar_position: 1
title: 第一个应用
---

:::info 应用说明
项目中的应用均放置在 `modules` 目录中，每个应用均由 MVC 结构构成，我们推荐使用脚手架命令生成对应的功能。
:::
## 应用生成

执行以下命令可生成一个基础的应用结构 `blog` 为应用名

```shell
php artisan app:make blog
```

执行后会自动在 `modules` 目录中增加 `Blog` 为目录名的应用结构

```
modules
└── Blog
    ├── Admin                  // 后台控制器
    ├── Api                    // Api接口
    ├── Config                 // 应用配置
    │   └── Config.php
    ├── Menu                   // 菜单
    │   └── Admin.php
    ├── Model                  // 模型
    ├── Route                  // 路由
    │   └── AuthAdmin.php
    ├── Service                // 业务服务层
    └── View                   // 视图
        └── Admin
```

## 控制器生成

执行以下命令可生成 `blog` 应用的后台控制器和对应的路由与菜单，执行目录后请输入类名为 test 。

```shell
php artisan app:make-admin blog
```

分别查看以下文件查看生成情况：

- `Admin/Test.php`   后台控制器 
- `Menu/Admin.php`  菜单注册
- `Route/AuthAdmin.php` 路由注册

## 模型生成

执行以下命令生成模型与对应的数据库表，`blog` 为应用名。

```shell
php artisan app:make-model blog --table=blog --key=blog_id
```

检查数据库中查看是否新增表并在该表增加 `varchar` 类型的字段 `title`

## 指定控制器模型

打开后台控制器文件修改对应的模型类为当前生成的模型类，将模型进行替换：

```php title="modules/Blog/Admin/Test.php"
// public string $model = \Duxravel\Core\Model\Base::class;
public string $model = \Modules\Blog\Model\Blog::class;
```

## 增加表格元素

在控制器中的 `table` 方法中增加表格元素用来展示`列表` 页面：

```php
$table->filter('搜索', 'title')->text('请输入标题搜索')->quick();

$table->action()->button('添加', 'admin.blog.test.page')->type('dialog')->icon('plus');

$table->column('标题', 'title');
$column = $table->column('操作')->width('180')->align('right');
$column->link('编辑', 'admin.blog.test.page', ['id' => 'blog_id']);
$column->link('删除', 'admin.blog.test.del', ['id' => 'blog_id'])->type('ajax');
```

## 增加表单元素

在控制器中的 `form` 方法中增加表单元素用于`增加` 与 `编辑` 时的表格内容：

```php
$form->card(function (Form $form) {
  $form->text('标题', 'title');
});
```

## 测试功能

经过以上步骤我们完成了最基础的一个应用的开发，访问后台即可看到刚开发后的应用功能，我们尝试在 blog 中增加一条数据来观察数据的变化。