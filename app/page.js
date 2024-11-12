'use client'

import styles from "@/page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.centeredBox}>
        <h2 className={styles.header2}>Choose which app you want to access</h2>
        <div className={styles.buttonContainer}>
          <Link href="/notekeeper">
            <button className={`${styles.button} ${styles.leftButton}`}>Note Keeper</button>
          </Link>
          <Link href="/shoppinglist">
            <button className={`${styles.button} ${styles.rightButton}`}>Shopping List</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
