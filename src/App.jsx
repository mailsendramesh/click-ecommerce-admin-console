import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { StatCard } from './components/StatCard.jsx';
import { TransactionTable } from './components/TransactionTable.jsx';
import { SectionPage } from './components/SectionPage.jsx';
import transactionsFixture from './data/transactions.json';
import metricRules from './data/dashboard_metric_rules.json';
import styles from './styles/App.module.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', symbol: 'O' },
  { id: 'orders', label: 'Orders', symbol: 'B' },
  { id: 'products', label: 'Products', symbol: 'P' },
  { id: 'customers', label: 'Customers', symbol: 'C' },
  { id: 'analytics', label: 'Analytics', symbol: 'A' },
  { id: 'settings', label: 'Settings', symbol: 'S' },
];
const TITLES = Object.fromEntries(NAV_ITEMS.map(item => [item.id, item.label]));
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export function App() {
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState(metricRules);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let alive = true;
    async function loadDashboard() {
      setLoading(true);
      try {
        const [txResponse, metricResponse] = await Promise.all([
          fetch('/api/transactions').then(r => { if (!r.ok) throw new Error('Transactions API unavailable'); return r.json(); }),
          fetch('/api/summary').then(r => { if (!r.ok) throw new Error('Summary API unavailable'); return r.json(); }),
        ]);
        if (alive) {
          setTransactions(Array.isArray(txResponse.items) ? txResponse.items : transactionsFixture);
          setMetrics(metricResponse);
          setError('');
        }
      } catch {
        if (alive) {
          // The supplied fixture data is the documented offline fallback, not live store data.
          setTransactions(transactionsFixture);
          setMetrics(metricRules);
          setError('Showing supplied sample records. The optional local fixture API is not connected.');
        }
      } finally { if (alive) setLoading(false); }
    }
    loadDashboard();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const onKeyDown = event => { if (event.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const sortedTransactions = useMemo(() => [...transactions].sort((a, b) => b.order_date.localeCompare(a.order_date) || b.transaction_id.localeCompare(a.transaction_id)), [transactions]);
  const filteredTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedTransactions;
    return sortedTransactions.filter(row => [row.transaction_id, row.customer_name, row.status, row.product_name].some(value => String(value).toLowerCase().includes(q)));
  }, [sortedTransactions, search]);

  const goTo = page => { setActivePage(page); setSidebarOpen(false); setSearch(''); };

  return <div className={styles.appShell}>
    <Sidebar items={NAV_ITEMS} activePage={activePage} onNavigate={goTo} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <div className={styles.mainColumn}>
      <Header title={TITLES[activePage]} search={search} onSearch={setSearch} onMenu={() => setSidebarOpen(v => !v)} menuOpen={sidebarOpen} />
      <main id="workspace" className={styles.workspace}>
        {activePage === 'overview' ? <>
         <div className={styles.pageIntro}>
  <div>
    <p className={styles.eyebrow}>WORKSPACE / OVERVIEW</p>
    <h1>Store performance</h1>
  </div>
</div>
          {error && <div className={styles.notice} role="status">{error}</div>}
          <section className={styles.statsGrid} aria-label="Sales summary">
            <StatCard label="Gross sales" value={money(metrics.gross_sales_inr)} note="All transactions" tone="blue" />
            <StatCard label="Net sales" value={money(metrics.net_sales_excluding_refunds_inr)} note="Excludes refunds" tone="green" />
            <StatCard label="Transactions" value={metrics.transactions} note="In current dataset" tone="purple" />
            <StatCard label="Processing" value={metrics.processing_orders} note="Awaiting next step" tone="orange" />
          </section>
          <TransactionTable rows={filteredTransactions.slice(0, 8)} loading={loading} total={filteredTransactions.length} />
          <p className={styles.dataFootnote}></p>
        </> : <SectionPage page={activePage} transactions={sortedTransactions} />}
      </main>
    </div>
  </div>;
}
