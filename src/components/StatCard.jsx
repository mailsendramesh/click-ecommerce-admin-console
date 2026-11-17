import styles from '../styles/StatCard.module.css';
export function StatCard({ label, value, note, tone }) {
  return <article className={styles.card}><div className={styles.cardTop}><span className={`${styles.icon} ${styles[tone]}`} aria-hidden="true">{label.slice(0,1)}</span><span className={styles.label}>{label}</span></div><strong className={styles.value}>{value}</strong><span className={styles.note}>{note}</span></article>;
}
