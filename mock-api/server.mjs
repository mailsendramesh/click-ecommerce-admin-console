import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const here = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.MOCK_API_PORT || 4174);
const transactions = JSON.parse(fs.readFileSync(new URL('../fixtures/transactions.json', import.meta.url), 'utf8'));
const metricRules = JSON.parse(fs.readFileSync(new URL('../fixtures/dashboard_metric_rules.json', import.meta.url), 'utf8'));
const server = http.createServer((req,res) => {
 res.setHeader('Access-Control-Allow-Origin','http://localhost:5173');
 res.setHeader('Content-Type','application/json; charset=utf-8');
 if(req.url === '/api/transactions') return res.end(JSON.stringify({items:transactions,total:transactions.length}));
 if(req.url === '/api/summary') return res.end(JSON.stringify(metricRules));
 res.statusCode=404;res.end(JSON.stringify({error:'Not found'}));
});
server.listen(port,()=>console.log(`Mock API: http://localhost:${port}`));
