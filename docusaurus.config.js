const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Duxravel 后台开发框架',
  tagline: '基于 Laravel 驱动的开源后台管理开发框架',
  url: 'https://www.duxravel.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'duxphp', // Usually your GitHub org/user name.
  projectName: 'duxravel', // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    
    colorMode: {
      switchConfig: {
        darkIconStyle: {
          color: '#fff',
        },
        lightIconStyle: {
          color: '#fff',
        },
      },
    },
    footer: {
      links: [
        {
          title: '入门',
          items: [
            {
              label: '安装方式',
              to: 'docs',
            },
            {
              label: '开发应用',
              to: 'docs/dev/init',
            },
          ],
        },
        {
          title: '指南',
          items: [
            {
              label: '项目部署',
              to: 'docs/guide/helper',
            },
            {
              label: '应用发布',
              to: 'docs/guide/package',
            },
          ],
        },
        {
          title: '赞助',
          items: [
            {
              label: '赞助方式',
              to: 'blog/about',
            },
          ],
        },
        {
          title: '源码托管',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/duxphp/duxravel',
            },
            {
              label: 'Gitee',
              href: 'https://gitee.com/duxphp/duxravel',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="http://www.duxravel.com" class="footer-link" target="__blank" rel="noreferrer noopener">Duxravel</a>`,
    },
    navbar: {
      title: 'Duxravel',
      logo: {
        alt: 'Dxuravel Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'start',
          position: 'left',
          label: '阅读文档',
        },
        {to: '/blog/update-log', label: '更新记录', position: 'left'},
        {to: '/application', label: '应用中心', position: 'left'},
        {to: '/blog/about', label: '关于我们', position: 'left'},
        {to: '/blog/group', label: '加入讨论', position: 'left'},
        {
          href: 'https://gitee.com/duxphp/duxravel',
          label: 'Gitee',
          position: 'right',
        },
        {
          href: 'https://github.com/duxphp/duxravel',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['php'],
    },
    algolia: {
      appId: 'QJNTFL07ZW',
      apiKey: 'cd3982bf8c6e9581f61840d8a66ef49c',
      indexName: 'duxravel',
      contextualSearch: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/duxphp/duxravel-doc/edit/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
