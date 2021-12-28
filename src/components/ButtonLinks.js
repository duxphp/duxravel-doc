import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './ButtonLinks.module.css';

export default function ButtonLinks({ className }) {
  return (
    <div className={className}>
      <Link className={clsx(styles.link, styles.linkBlack)} href="/docs/start">
        快速开始
      </Link>
      {'\u00A0'}
      {'\u00A0'}
      {'\u00A0'}
      {'\u00A0'}
      <a
        className={clsx(styles.link, styles.linkWhite)}
        href="https://github.com/duxphp/duxravel"
        target="__blank"
        rel="noreferrer noopener"
      >
        获取源码
      </a>
    </div>
  );
}
