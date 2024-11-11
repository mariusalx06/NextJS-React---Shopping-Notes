import styles from "./header.module.css";

export default function Header(){
    return(
        <header className={styles.header}>
            <h1>Marius's First NextJS App</h1>
        </header>
    );
}