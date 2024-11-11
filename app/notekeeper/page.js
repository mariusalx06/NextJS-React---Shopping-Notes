'use client'

import styles from "@/notekeeper/notekeeper.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateArea from "@/components/CreateArea";
import Link from "next/link";
import { useState } from "react";


export default function NoteKeeper() {

  


  return (
    <div>
      <Header />
      <CreateArea />
      <Footer />
    </div>
  );
}
