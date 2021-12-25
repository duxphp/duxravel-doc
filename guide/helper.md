## 部署说明

系统开发完毕后您可以将整个项目上传至 Web 站点中，部署方式与 Laravel 项目部署方式一致。

### 设置运行目录

将系统上传至站点环境的根目录并将运行目录指定至 `public` 目录中。

### 更改系统配置

修改 `.env` 文件中的 `APP_URL`参数为环境站点的 Url

### 伪静态规则

根据不同 web 环境选择对应的伪静态规则进行重写 Url，目前我们不推荐在 IIS 下运行，可能会产生意外的问题。

#### Nginx

```
location / {
  try_files $uri $uri/ /index.php?$query_string;
}
```

#### Apache

```
<IfModule mod_rewrite.c>
<IfModule mod_negotiation.c>
Options -MultiViews
</IfModule>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^\index\/show$ laravel/public/show [R=301]

# Redirect Trailing Slashes If Not A Folder...
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^(.*)/$ /$1 [L,R=301]

# Handle Front Controller...
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f

RewriteRule ^ index.php [L]

</IfModule>
```

