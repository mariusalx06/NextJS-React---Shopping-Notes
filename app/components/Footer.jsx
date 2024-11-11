import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>© {year} Marius Calin.</p>
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/marius-calin-473933204/" className={styles.socialLink} target='_blank'>LinkedIn</a>
          <a href="https://github.com/mariusalx06" className={styles.socialLink} target='_blank'>GitHub</a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;