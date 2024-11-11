'use client'

import styles from "@/shoppinglist/shoppinglist.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function NoteKeeper() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <Footer />
    </div>
  );
}
