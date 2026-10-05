# SIP Calculator

A dependency-free web calculator for mutual fund Systematic Investment Plans.

**Features**
- Monthly investment, expected annual return, and tenure (sliders + number inputs)
- Optional annual step-up (increase SIP by X% every year)
- Invested amount, estimated returns, and total value (formatted in ₹)
- Donut chart of invested vs. returns, and a year-by-year breakdown table
- Responsive layout with light/dark mode

**Formula** (contributions at the start of each month, monthly compounding):

    FV = P × [((1 + i)^n − 1) / i] × (1 + i),   i = annual rate / 12 / 100,  n = months

With step-up, the value is simulated month by month and the contribution is raised at the start of each year.

## Usage
Open `index.html` in a browser.

## Tests
    node sip.test.js
