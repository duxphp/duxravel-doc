import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Cookies, setCookie } from '../utils';
import styles from './Announcement.module.css';

const Announcement = ({ setIsAnnouncementOpen }) => {
  const onCloseClick = () => {
    setCookie(Cookies.ANNOUNCEMENT_DISABLED, 'true', 1);
    setIsAnnouncementOpen(false);
  };

  return (
    <BrowserOnly>
      {() => (
        <div className={styles.announcement}>
          <div>
            ☆ 如果觉得这个项目对您有用，请给这个项目一个 Star {' '}
            <a href="https://github.com/duxphp/duxravel" target="__blank" rel="noreferrer noopener">
              Github
            </a>{' '}
            ☆
          </div>

          <button onClick={onCloseClick}>✕</button>
        </div>
      )}
    </BrowserOnly>
  );
};

export default Announcement;
