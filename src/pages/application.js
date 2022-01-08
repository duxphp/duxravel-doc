import React from 'react';
import Layout from '@theme/Layout';
import copy from 'copy-to-clipboard';
import styles from './application.module.css';


const AppList = [
    {
        name: 'Duxravel CMS',
        title: 'Duxravel 内容基础应用',
        description: '提供基础的内容管理与模板功能，针对 Web 站点的基础服务。',
        author: 'duxphp',
        color: '#1E5EFF',
        url: '/docs/extend/cms',
        lib: 'https://github.com/duxphp/duxravel-cms',
        exec: 'composer require duxphp/duxravel-cms'
    },

    {
        name: 'Duxravel Article',
        title: 'Duxravel 文章管理应用',
        description: '基于 CMS 应用提供文章管理 Web、Api端，与多模型内容支持。',
        author: 'duxphp',
        color: '#272E3B',
        url: '/docs/extend/article',
        lib: 'https://github.com/duxphp/duxravel-article',
        exec: 'composer require duxphp/duxravel-article'
    },


    {
        name: 'Duxravel Member',
        title: 'Duxravel 文章管理应用',
        description: '提供基础会员信息、等级管理功能与相关 api 与鉴权。',
        author: 'duxphp',
        color: '#FF7D00',
        url: '/docs/extend/member',
        lib: 'https://github.com/duxphp/duxravel-member',
        exec: 'composer require duxphp/duxravel-member'
    },
];


function Application() {


    return (
        <Layout title="应用中心">
            <div
                className='container margin-vert--lg'
            >
                <div className={styles.application}>

                    {AppList.map((item) => (
                    <div className={styles.applicationModule}>
                        <div className={styles.applicationItem}>
                            <a href={item.url} target="_blank" className={styles.applicationImage} style={{
                                backgroundColor: item.color
                            }}>
                                {item.name}
                            </a>
                            <div className={styles.applicationTitle}>
                                <a href={item.url} target="_blank">{item.title}</a>
                            </div>
                            <div className={styles.applicationDesc}>{item.description}</div>
                            <div className={styles.applicationFoot}>
                                <div className={styles.applicationFootLeft}>
                                    <span>{item.author}</span>
                                </div>
                                <div className={styles.applicationFootRight}>
                                    {item.exec && <span onClick={() => {
                                        copy(item.exec)
                                        window.alert('复制安装命令成功，请在项目中执行。')
                                    }}>复制</span>}
                                    {item.lib && <a href={item.lib} target="_blank">仓库</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        </Layout>

    );
}

export default Application;