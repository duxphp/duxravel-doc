import React from 'react';
import ButtonLinks from './ButtonLinks';

import styles from './Features.module.css';
import Npx from './Npx';

const FeatureList = [
  {
    title: '开箱即用',
    description: '1分钟快速安装，安装后即可进入开发无需复杂配置。',
    icon: 'channels.svg',
  },
  {
    title: '模块化开发',
    description: 'App 式开发架构低耦合高内聚，多人协作互不干涉。',
    icon: 'email-notifications.svg',
  },
  {
    title: '命令行脚手架',
    description: '简单几句命令搞定重复工作，可轻松建立初始应用模块。',
    icon: 'newsfeed.svg',
  },
  {
    title: '微前端架构',
    description: '集成 Vue 单页实时编译与 JSON DOM编译器，免去二次打包。',
    icon: 'responsive.svg',
  },
  {
    title: 'Arco UI 库',
    description: '集成开源的 Arco 前端组件，优化用户操作体验与美观的设计。',
    icon: 'ui-library.svg',
  },
  {
    title: '多后台架构',
    description: '多后台公共设计，可轻松开发多用途后台功能。',
    icon: 'user-presence.svg',
  },
  {
    title: '应用化扩展',
    description: '通过应用打包可轻松将应用分享给他人或出售使用。',
    icon: 'seo.svg',
  },
  {
    title: '简单权限',
    description: '基于路由的多角色权限设计，无需在数据库进行复杂权限配置。',
    icon: 'real-time-notifications.svg',
  },
  {
    title: '菜单接入',
    description: '接口化菜单接入，可将应用轻松接入任意菜单模块中，无需后台配置。',
    icon: 'branding.svg',
  },
  {
    title: 'Api 鉴权',
    description: '集成基础 Api 开发能力，可直接上手进行接口开发系统集成鉴权机制。',
    icon: 'search.svg',
  },

  {
    title: 'Laravel PHP',
    description: '基于 Laravel 作为基础框架开发框架让开发者得心应手。',
    icon: 'messenger.svg',
  },
  {
    title: '100% 开源',
    description: '遵循标准的 MIT 开源协议，让开发产品无后顾之忧。',
    icon: 'open-source.svg',
  },
];

function Feature({ title, description, icon }) {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.feature}>
        <img src={`/img/${icon}`} className={styles.icon} alt={title} />
        <div className={styles.featureText}>
          <h3 className="heading">{title}</h3>
          <p className="text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <div className="container">
      <div className={styles.container}>
        <h2 className="heading">产品特点</h2>
        <p className="text">Duxravel 解决了中小型 Web 项目的开发效率与体验的痛点</p>
      </div>
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </section>

      <div className={styles.bottomContainer}>
        <h2>Ready to start?</h2>
        <ButtonLinks className={styles.buttons} />
        <Npx />
      </div>
    </div>
  );
}
