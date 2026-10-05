(function () {
  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const fields = ['amount', 'rate', 'years', 'stepup'];
  const $ = (id) => document.getElementById(id);

  function clamp(input) {
    const v = Number(input.value);
    const min = Number(input.min), max = Number(input.max);
    return Math.min(max, Math.max(min, isNaN(v) ? min : v));
  }

  function render() {
    const result = SIP.calculateSip({
      monthlyInvestment: clamp($('amount')),
      annualReturnRate: clamp($('rate')),
      years: clamp($('years')),
      annualStepUp: clamp($('stepup')),
    });

    $('out-invested').textContent = inr.format(result.invested);
    $('out-returns').textContent = inr.format(result.returns);
    $('out-total').textContent = inr.format(result.totalValue);

    const pct = (result.returns / result.totalValue) * 100;
    $('returns-arc').style.strokeDasharray = `${pct} ${100 - pct}`;

    $('table-body').innerHTML = result.yearly.map((y) =>
      `<tr><td>${y.year}</td><td>${inr.format(y.monthlyContribution)}</td><td>${inr.format(y.invested)}</td>` +
      `<td>${inr.format(y.returns)}</td><td>${inr.format(y.value)}</td></tr>`
    ).join('');
  }

  fields.forEach((f) => {
    const range = $(f), num = $(f + '-n');
    range.addEventListener('input', () => { num.value = range.value; render(); });
    num.addEventListener('input', () => {
      if (num.value === '') return;
      range.value = clamp(num);
      render();
    });
    num.addEventListener('change', () => { num.value = clamp(num); range.value = num.value; render(); });
  });

  render();
})();
