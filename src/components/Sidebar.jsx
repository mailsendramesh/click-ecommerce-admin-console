import styles from '../styles/Sidebar.module.css';
export function Sidebar({ items, activePage, onNavigate, open, onClose }) {
  return <>
    <div className={`${styles.scrim} ${open ? styles.scrimVisible : ''}`} onClick={onClose} aria-hidden="true" />
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`} aria-label="Main sidebar">
      <div className={styles.brand}>
  <img
    src="/click_admin_logo.svg"
    alt="Click Ecommerce Admin"
  />
  <button
    className={styles.close}
    onClick={onClose}
    aria-label="Close navigation"
  >
    ×
  </button>
</div>
      <p className={styles.groupLabel}>WORKSPACE</p>
      <nav className={styles.nav} aria-label="Workspace navigation">
        {items.map(item => <button key={item.id} className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`} onClick={() => onNavigate(item.id)} aria-current={activePage === item.id ? 'page' : undefined}>
          <span className={styles.navSymbol} aria-hidden="true">{item.symbol}</span><span>{item.label}</span>
        </button>)}
      </nav>
      <div className={styles.sidebarFooter}><div className={styles.adminCard}><span className={styles.adminAvatar}>WA</span><span><strong>Workspace admin</strong><small>Click Ecommerce</small></span></div><small className={styles.version}>ADMIN WORKSPACE</small></div>
    </aside>
  </>;
}
