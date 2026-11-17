
import fs from 'node:fs';

const transactions = JSON.parse(
  fs.readFileSync(
    new URL('../fixtures/transactions.json', import.meta.url),
    'utf8'
  )
);

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    items: transactions,
    total: transactions.length
  });
}
