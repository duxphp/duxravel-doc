import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/Features';
import ButtonLinks from '../components/ButtonLinks';
import Npx from '../components/Npx';
import Announcement from '../components/Announcement';
import { Cookies, getCookie } from '../utils';

function HomePageWelcome() {
  const { siteConfig } = useDocusaurusContext();
  const home = require('../../static/img/home-page.jpeg').default
  return (
    <div>
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={clsx('hero__title heading ', styles.title)}>Duxravel</h1>
          <p className={clsx('hero__subtitle text', styles.subtitle)}>{siteConfig.tagline}</p>
          <ButtonLinks className={styles.buttons} />
          <Npx />
        </div>
      </header>
      <div className={styles.screenshot}>
        <img
          src={home}
          alt="Duxravel 首页预览"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const announcementDisabled = getCookie(Cookies.ANNOUNCEMENT_DISABLED);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(announcementDisabled !== 'true');
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      {isAnnouncementOpen && <Announcement setIsAnnouncementOpen={setIsAnnouncementOpen} />}

      <Layout className={styles.homePage} title={siteConfig.title} description={siteConfig.description}>
        <div className={styles.container}>
          <div className={styles.topLeftOverlay}></div>
          <div className={styles.topRightOverlay}></div>
          <HomePageWelcome />
          <div className={styles.homePageFeatures}>
            <HomepageFeatures />
            <div className={styles.bottomLeftOverlay}></div>
            <div className={styles.bottomRightOverlay}></div>
          </div>
        </div>
      </Layout>
    </>
  );
}
