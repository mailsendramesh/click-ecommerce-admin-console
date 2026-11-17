# Click Ecommerce Admin Console

A responsive React admin workspace for the Click Ecommerce Store India assignment. The interface includes sidebar navigation, dashboard sales cards, recent transactions, and supporting Orders, Products, Customers, Analytics, and Settings views.

> **Data notice:** The figures shown in this project are calculated from the assignment's supplied fixture data. They are sample values, not live store performance.

## Features

- React functional components and Hooks.
- Modular UI components and CSS Modules.
- Sidebar navigation for Overview, Orders, Products, Customers, Analytics, and Settings.
- Responsive desktop, tablet, and mobile layouts.
- Dashboard KPI cards for gross sales, net sales, transactions, and processing orders.
- Recent transaction list with search filtering.
- Mock API endpoints for transaction and summary data.
- Loading and API-fallback messaging.
- Mobile transaction-card presentation and desktop/tablet transaction table.

## Requirements

- Node.js (LTS recommended)
- npm

## Local setup

1. Clone the repository.
2. Open the project directory in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the mock API in terminal 1:

   ```bash
   npm run api
   ```

   The mock API listens on `http://localhost:4174`.

5. Start the Vite development server in terminal 2:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite (normally `http://localhost:5173`).

The Vite development server proxies `/api` requests to the mock API at port `4174`. Keep both processes running while testing the API-backed interface.

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run api` | Start the local fixture/mock API |
| `npm run test:fixtures` | Run fixture validation tests |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Mock API and fixture data

The project includes supplied fixture data under `fixtures/` and local fallback copies under `src/data/`.

- `GET /api/transactions` returns the transaction fixture records.
- `GET /api/summary` returns the dashboard metric rules/summary.
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

## Project structure

```text
click-ecommerce-admin/
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
├── README.md
└── vite.config.js
```

## Responsive viewports checked

- Desktop: 1440 × 900
- Tablet: 768 × 1024
- Mobile: 390 × 844

The final evidence screenshots should be stored separately in the submission evidence folder using these filenames:

- `Desktop_1440_result.png`
- `Tablet_768_result.png`
- `Mobile_390_result.png`

## Tests and build

Run:

```bash
npm run test:fixtures
npm run build
```

Record the actual output and browser/version used for manual checks in `TEST_RESULTS.txt`. Do not mark a check as passed unless it was actually performed.

## Known limitations / remaining deployment work

- The current API is a local mock API backed by supplied fixtures; it is not a production backend.
- The Vite proxy configuration is for local development only. A deployed frontend will not be able to reach the developer's `localhost` mock API. Before public deployment, configure a production API endpoint or deploy the mock API as a separately reachable service and update the frontend configuration.
- Fixture data is sample assignment data and must not be described as live store data.
- The transaction table uses horizontal scrolling where its columns exceed the available tablet width; verify that users can scroll to the Amount and Status columns.
- Authentication, role management, and live ecommerce integrations are outside the current supplied scope.

## License

Created for the Click Ecommerce Admin Console assignment. Refer to the assignment terms for permitted use.
