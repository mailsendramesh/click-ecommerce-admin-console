import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const rows=JSON.parse(fs.readFileSync(new URL('../fixtures/transactions.json',import.meta.url)));
const metrics=JSON.parse(fs.readFileSync(new URL('../fixtures/dashboard_metric_rules.json',import.meta.url)));
test('unique transactions with valid totals',()=>{
 assert.equal(rows.length,48);
 assert.equal(new Set(rows.map(r=>r.transaction_id)).size,48);
 assert.ok(rows.every(r=>r.quantity>0 && r.quantity*r.unit_price_inr===r.gross_amount_inr));
 assert.equal(rows.reduce((v,r)=>v+r.gross_amount_inr,0),metrics.gross_sales_inr);
 assert.equal(rows.filter(r=>r.status!=='Refunded').reduce((v,r)=>v+r.gross_amount_inr,0),metrics.net_sales_excluding_refunds_inr);
 assert.equal(rows.filter(r=>r.status==='Processing').length,metrics.processing_orders);
});
