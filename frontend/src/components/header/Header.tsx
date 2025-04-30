import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>NETFLEX</div>
    <div className={styles.auth}>
        <button className={styles.authTextButton}>SIGN IN</button>
        <span className={styles.separator}> | </span>
        <button className={styles.authTextButton}>LOGIN</button>
    </div>
  </header>
);
export default Header;