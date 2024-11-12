import Link from 'next/link';
import styles from './Navbar.module.css';
import { usePathname } from 'next/navigation';

export default function Navbar (){

    const pathname = usePathname();
    let buttonColor = styles.default;
    let buttonTextColor = styles.default;

    switch (pathname) {
        case '/':
            buttonColor = styles.default;
          break;
        case '/notekeeper':
            buttonColor = styles.notekeeper;
          break;
        case '/shoppinglist':
            buttonColor = styles.shoppinglist;
            buttonTextColor = styles.shoppinglist;
          break;
        default:
            buttonColor = styles.default;
          break;
    }

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={`${styles.button} ${buttonColor}`}>Home</Link>
      <Link href="/notekeeper" className={`${styles.button} ${buttonColor}`}>NoteKeeper</Link>
      <Link href="/shoppinglist" className={`${styles.button} ${buttonColor}`}>ShoppingList</Link>
    </nav>
  );
};
