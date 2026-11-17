# Click Ecommerce Admin Console

A responsive React admin workspace developed for the Click Ecommerce Store India assignment. The application includes sidebar navigation, dashboard sales cards, recent transactions, and supporting Orders, Products, Customers, Analytics, and Settings views.

**Live Demo:** https://click-ecommerce-admin-console-plp99rv1u-growth-dashboard1.vercel.app/

**GitHub Repository:** https://github.com/mailsendramesh/click-ecommerce-admin-console

> **Data notice:** All figures shown in this project are calculated from the assignment's supplied fixture data. They are sample values, not live store performance.

## Features

- React functional components and Hooks.
- Modular UI components and CSS Modules.
- Sidebar navigation for Overview, Orders, Products, Customers, Analytics, and Settings.
- Responsive desktop, tablet, and mobile layouts.
- Dashboard KPI cards for gross sales, net sales, transactions, and processing orders.
- Recent transaction list with search filtering.
- Local mock API for transaction and summary data.
- Vercel serverless API endpoints for production.
- Loading and API-fallback messaging.
- Mobile transaction-card presentation and desktop/tablet transaction table.
- Responsive sidebar navigation with mobile menu support.

## Requirements

- Node.js (LTS recommended)
- npm

## Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mailsendramesh/click-ecommerce-admin-console.git
   ```

2. Open the project directory:

   ```bash
   cd click-ecommerce-admin-console
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local mock API in terminal 1:

   ```bash
   npm run api
   ```

   The mock API listens on `http://localhost:4174`.

5. Start the Vite development server in terminal 2:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite, normally `http://localhost:5173`.

The Vite development server proxies `/api` requests to the local mock API at port `4174`. Keep both processes running while testing the API-backed interface.

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run api` | Start the local fixture/mock API |
| `npm run test:fixtures` | Run fixture validation tests |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Mock API and Fixture Data

The project includes supplied fixture data under `fixtures/` and local fallback copies under `src/data/`.

Local development endpoints:

- `GET /api/transactions` returns the transaction fixture records.
- `GET /api/summary` returns the dashboard metric rules and summary.
- The Vite development proxy forwards `/api` requests to `http://localhost:4174`.

The dashboard values verified from the supplied fixtures are:

| Metric | Value |
|---|---:|
| Gross sales | ₹70,436 |
| Net sales | ₹66,542 |
| Transactions | 48 |
| Processing | 10 |

Transaction status totals:

| Status | Count |
|---|---:|
| Paid | 23 |
| Processing | 10 |
| Shipped | 5 |
| Delivered | 5 |
| Refunded | 5 |
| **Total** | **48** |

The difference between gross and net sales is ₹3,894, matching the refunded transaction value in the supplied fixture data.

## Production Deployment

The application is deployed to Vercel.

**Production URL:** https://click-ecommerce-admin-console-plp99rv1u-growth-dashboard1.vercel.app/

Production API endpoints:

- `GET /api/transactions` — Returns the 48 supplied transaction records.
- `GET /api/summary` — Returns dashboard summary metrics.

The production API uses Vercel serverless functions in the `api/` directory. The local development environment uses the mock API in `mock-api/`.

The following production endpoints were checked successfully:

- `/api/transactions`
- `/api/summary`

The live dashboard was also opened and checked after deployment.

## Project Structure

```text
click-ecommerce-admin/
├── api/
│   ├── summary.js
│   └── transactions.js
├── fixtures/
│   ├── catalog.csv
│   ├── dashboard_metric_rules.json
│   ├── transactions.csv
│   └── transactions.json
├── mock-api/
│   ├── fixtures.test.mjs
│   └── server.mjs
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SectionPage.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── TransactionTable.jsx
│   ├── data/
│   │   ├── dashboard_metric_rules.json
│   │   └── transactions.json
│   ├── styles/
│   │   ├── App.module.css
│   │   ├── Header.module.css
│   │   ├── SectionPage.module.css
│   │   ├── Sidebar.module.css
│   │   ├── StatCard.module.css
│   │   ├── TransactionTable.module.css
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── TEST_RESULTS.txt
└── vite.config.js
```

## Responsive Viewports Checked

- Desktop: 1440 × 900
- Tablet: 768 × 1024
- Mobile: 390 × 844

## Tests and Build

Run the following commands:

```bash
npm run test:fixtures
npm run build
```

The fixture validation test completed successfully with 1 test passed and 0 failures. The Vite production build also completed successfully.

Manual browser checks should be recorded in `TEST_RESULTS.txt`, including the browser/version and tested viewport dimensions.

## Known Limitations

- The application uses supplied fixture data rather than a live ecommerce database.
- Authentication and role management are outside the current assignment scope.
- Live ecommerce platform integrations are not included.
- The local mock API is intended for development; production requests use Vercel serverless API endpoints.
- The transaction table uses horizontal scrolling where its columns exceed the available tablet width.

## License

Created for the Click Ecommerce Admin Console assignment. Refer to the assignment terms for permitted use.