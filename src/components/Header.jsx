import styles from '../styles/Header.module.css';
export function Header({ title, search, onSearch, onMenu, menuOpen }) {
  return <header className={styles.header}>
    <button className={styles.menuButton} onClick={onMenu} aria-label="Open navigation" aria-expanded={menuOpen}><span></span><span></span><span></span></button>
    <div className={styles.mobileBrand}>click<span>.</span></div>
    <div className={styles.headerTitle}>{title}</div>
    <label className={styles.searchWrap}><span aria-hidden="true">⌕</span><input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search orders or customers" aria-label="Search orders or customers" /></label>
    <button className={styles.profile} aria-label="Workspace admin profile">WA</button>
  </header>;
}
