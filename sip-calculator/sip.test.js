const assert = require('node:assert');
const { calculateSip, sipFutureValue } = require('./sip.js');

const close = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

// Flat SIP matches the closed-form formula
const r = calculateSip({ monthlyInvestment: 10000, annualReturnRate: 12, years: 10 });
close(r.totalValue, sipFutureValue(10000, 12, 10));
close(r.totalValue, 2323390.76, 1); // well-known reference value
assert.strictEqual(r.invested, 1200000);
assert.strictEqual(r.yearly.length, 10);

// Zero return => value equals invested
const z = calculateSip({ monthlyInvestment: 5000, annualReturnRate: 0, years: 5 });
close(z.totalValue, 300000);
close(z.returns, 0);

// Step-up increases contributions each year
const s = calculateSip({ monthlyInvestment: 10000, annualReturnRate: 12, years: 3, annualStepUp: 10 });
close(s.invested, 120000 + 132000 + 145200);
assert.ok(s.totalValue > calculateSip({ monthlyInvestment: 10000, annualReturnRate: 12, years: 3 }).totalValue);

assert.throws(() => calculateSip({ monthlyInvestment: 0, annualReturnRate: 12, years: 10 }));
console.log('All SIP tests passed');
