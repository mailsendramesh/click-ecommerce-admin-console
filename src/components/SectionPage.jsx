import styles from '../styles/SectionPage.module.css';
const config = {
  orders: { title: 'Orders', description: 'Review order activity and fulfillment status.', stat: 'Total orders', detail: 'Orders represented in the supplied transaction dataset.' },
  products: { title: 'Products', description: 'Explore products represented in the current order records.', stat: 'Catalog items', detail: 'Distinct products found in transaction records.' },
  customers: { title: 'Customers', description: 'Understand customer activity across recorded transactions.', stat: 'Customers', detail: 'Distinct customers in the supplied dataset.' },
  analytics: { title: 'Analytics', description: 'A concise view of transaction status distribution.', stat: 'Gross sales', detail: 'Total recorded transaction value.' },
  settings: { title: 'Settings', description: 'Workspace information and implementation notes.', stat: 'Data mode', detail: 'Local assignment fixtures; no production credentials configured.' },
};
export function SectionPage({ page, transactions }) {
  const item = config[page];
  const customers = new Set(transactions.map(x => x.customer_name)).size;
  const products = new Set(transactions.map(x => x.product_sku)).size;
  const value = page === 'products' ? products : page === 'customers' ? customers : page === 'orders' ? transactions.length : page === 'analytics' ? new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(transactions.reduce((s,x)=>s+x.gross_amount_inr,0)) : 'Sample data';
  const counts = ['Paid','Processing','Shipped','Delivered','Refunded'].map(status => ({status,count:transactions.filter(x=>x.status===status).length}));
  return <div className={styles.page}><p className={styles.eyebrow}>WORKSPACE / {item.title.toUpperCase()}</p><h1>{item.title}</h1><p className={styles.description}>{item.description}</p>
    <div className={styles.summary}><span>{item.stat}</span><strong>{value}</strong><small>{item.detail}</small></div>
    {page === 'analytics' ? <section className={styles.panel}><h2>Transaction status breakdown</h2>{counts.map(x=><div className={styles.barRow} key={x.status}><span>{x.status}</span><div className={styles.track}><i style={{width:`${transactions.length ? x.count/transactions.length*100 : 0}%`}} /></div><strong>{x.count}</strong></div>)}</section> : null}
    {page === 'orders' ? <section className={styles.panel}><h2>Order status</h2>{counts.map(x=><div className={styles.listRow} key={x.status}><span>{x.status}</span><strong>{x.count}</strong></div>)}</section> : null}
    {page === 'products' ? <section className={styles.panel}><h2>Product activity</h2>{[...new Set(transactions.map(x=>x.product_name))].sort().map(name=><div className={styles.listRow} key={name}><span>{name}</span><strong>{transactions.filter(x=>x.product_name===name).length} transactions</strong></div>)}</section> : null}
    {page === 'customers' ? <section className={styles.panel}><h2>Recent customers</h2>{[...new Set(transactions.map(x=>x.customer_name))].sort().slice(0,12).map(name=><div className={styles.listRow} key={name}><span>{name}</span><strong>{transactions.filter(x=>x.customer_name===name).length} orders</strong></div>)}</section> : null}
    {page === 'settings' ? <section className={styles.panel}><h2>Workspace configuration</h2><div className={styles.listRow}><span>Application</span><strong>Click Ecommerce Admin</strong></div><div className={styles.listRow}><span>Data source</span><strong>Assignment fixtures / optional mock API</strong></div><div className={styles.listRow}><span>Currency</span><strong>INR (₹)</strong></div><div className={styles.listRow}><span>Production API</span><strong>Not supplied in assignment materials</strong></div></section> : null}
  </div>;
}
