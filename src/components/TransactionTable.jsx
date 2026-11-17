
import styles from '../styles/TransactionTable.module.css';

const money = value =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export function TransactionTable({ rows, loading, total }) {
  return (
    <section
      className={styles.panel}
      aria-labelledby="transactions-title"
    >
      <div className={styles.panelHeader}>
        <div>
          <h2 id="transactions-title">Recent transactions</h2>
          <p>Latest customer orders and payment status</p>
        </div>

        <span className={styles.count}>
          {total} records
        </span>
      </div>

      {loading ? (
        <div className={styles.state}>
          Loading transaction records…
        </div>
      ) : rows.length === 0 ? (
        <div className={styles.state}>
          No transactions match your search.
        </div>
      ) : (
        <>
          {/* Desktop and tablet table */}
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Transaction</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer</th>
                  <th scope="col" className={styles.amount}>
                    Amount
                  </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {rows.map(row => (
                  <tr key={row.transaction_id}>
                    <td>
                      <strong className={styles.txId}>
                        {row.transaction_id}
                      </strong>
                    </td>

                    <td>{row.order_date}</td>

                    <td>{row.customer_name}</td>

                    <td className={styles.amount}>
                      <strong>
                        {money(row.gross_amount_inr)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[row.status.toLowerCase()]
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile transaction list */}
          <div className={styles.mobileList}>
            {rows.slice(0, 4).map(row => (
              <div
                className={styles.mobileRow}
                key={row.transaction_id}
              >
                <div
                  className={styles.mobileIcon}
                  aria-hidden="true"
                >
                  +
                </div>

                <div className={styles.mobileDetails}>
                  <strong>{row.transaction_id}</strong>
                  <span>{row.customer_name}</span>
                </div>

                <strong className={styles.mobileAmount}>
                  {money(row.gross_amount_inr)}
                </strong>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
