
import fs from 'node:fs';

const metricRules = JSON.parse(
  fs.readFileSync(
    new URL('../fixtures/dashboard_metric_rules.json', import.meta.url),
    'utf8'
  )
);

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json(metricRules);
}
