/**
 * SIP (Systematic Investment Plan) calculation logic.
 *
 * Contributions are made at the start of each month (annuity due), which is
 * the convention used by most Indian mutual fund SIP calculators:
 *   FV = P * [((1 + i)^n - 1) / i] * (1 + i),  i = annualRate / 12 / 100
 *
 * An optional annual step-up increases the monthly contribution by a fixed
 * percentage at the start of every new year.
 */
(function (root) {
  function calculateSip({ monthlyInvestment, annualReturnRate, years, annualStepUp = 0 }) {
    const P = Number(monthlyInvestment);
    const r = Number(annualReturnRate);
    const y = Math.round(Number(years));
    const s = Number(annualStepUp);
    if (!(P > 0) || !(r >= 0) || !(y > 0) || !(s >= 0)) {
      throw new Error('Invalid SIP inputs');
    }

    const i = r / 12 / 100;
    let value = 0;
    let invested = 0;
    let contribution = P;
    const yearly = [];

    for (let year = 1; year <= y; year++) {
      for (let m = 0; m < 12; m++) {
        value = (value + contribution) * (1 + i);
        invested += contribution;
      }
      yearly.push({
        year,
        monthlyContribution: contribution,
        invested,
        value,
        returns: value - invested,
      });
      contribution *= 1 + s / 100;
    }

    return { invested, returns: value - invested, totalValue: value, yearly };
  }

  /** Closed-form future value for a flat SIP (no step-up). */
  function sipFutureValue(P, annualReturnRate, years) {
    const n = years * 12;
    const i = annualReturnRate / 12 / 100;
    if (i === 0) return P * n;
    return P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const api = { calculateSip, sipFutureValue };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SIP = api;
})(typeof window !== 'undefined' ? window : globalThis);
