'use client'

import styles from "./header.module.css";
import { usePathname } from 'next/navigation';

export default function Header(){
    const pathname = usePathname();
    let headerClass = styles.default;
    let h1Text = "Marius's First NextJS App";
    let textColor = styles.default;

    switch (pathname) {
        case '/':
          headerClass = styles.default;
          h1Text = "Marius's First NextJS App";
          textColor = styles.default;
          break;
        case '/notekeeper':
          headerClass = styles.notekeeper;
          h1Text = "Marius's Note Keeper";
          textColor = styles.notekeeper;
          break;
        case '/shoppinglist':
          headerClass = styles.shoppinglist;
          h1Text = "Marius's Shopping List";
          textColor = styles.shoppinglist;
          break;
        default:
          headerClass = styles.default;
          textColor = styles.default;
          h1Text = "Marius's First NextJS App";
          break;
    }

    return(
        <header className={`${styles.header} ${headerClass}`}>
            <h1>{h1Text}</h1>
        </header>
    );
}