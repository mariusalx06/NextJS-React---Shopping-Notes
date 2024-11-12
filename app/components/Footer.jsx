'use client'

import React, { useState,useEffect } from 'react';
import styles from './footer.module.css';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const [year,setYear]= useState(null);

    useEffect(() => {
      const currentYear = new Date().getFullYear();
      setYear(currentYear);
    }, []);
    
    const pathname = usePathname();
    let footerClass = '';
    
    switch (pathname) {
        case '/':
          footerClass = styles.default;
          break;
        case '/notekeeper':
          footerClass = styles.notekeeper;
          break;
        case '/shoppinglist':
          footerClass = styles.shoppinglist;
          break;
        default:
          footerClass = styles.default;
          break;
      }
    

  return (
    <footer className={`${styles.footer} ${footerClass}`}>
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