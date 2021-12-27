## 使用说明

表单组件内置了一些常用布局，如 card 与 tab 布局，方便应用不同的场景。

## 卡片布局

```php
$form->card('表单标题', function ($form) {
    $form->text('文本框', 'title');
    ...
});
```

## 切换布局

```php
$tabs = $form->tab();
$tabs->column('Tab1', function ($form) {
        $form->text('文本框', 'title');
        ...
});
$tabs->column('Tab2', function ($form) {
        $form->text('文本框', 'name');
        ...
});
```

## 多列布局

部分场景需要将多个表单组件放在同行多列中可以使用该组件实现。

```php
$row = $form->row();
$tabs->column(function ($form) {
        $form->text('文本框', 'title');
        ...
});
$tabs->column(function ($form) {
        $form->text('文本框', 'name');
        ...
});
```