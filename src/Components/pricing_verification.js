const PLAN_RATE = {
  Basic: { first: 4000, extra: 4000 },
  Standard: { first: 7500, extra: 7500 },
  Premium: { first: 12000, extra: 12000 },
};

const HOUSE_MULTIPLIER = {
  Studio: 0.8,
  Flat: 1,
  Condo: 1.05,
  Apartment: 1.1,
  Townhouse: 1.15,
  Duplex: 1.4,
  Bungalow: 1.2,
  Other: 1,
};

function calculate(plan, rooms, houseType) {
  const rates = PLAN_RATE[plan] || PLAN_RATE.Standard;
  const baseAmount = rates.first + Math.max(0, rooms - 1) * rates.extra;
  const mult = HOUSE_MULTIPLIER[houseType] || 1;
  return Math.round(baseAmount * mult);
}

const tests = [
  { plan: "Basic", rooms: 1, house: "Flat", expected: 4000 },
  { plan: "Basic", rooms: 2, house: "Flat", expected: 8000 },
  { plan: "Basic", rooms: 3, house: "Flat", expected: 12000 },
  { plan: "Standard", rooms: 1, house: "Flat", expected: 7500 },
  { plan: "Standard", rooms: 2, house: "Flat", expected: 15000 },
  { plan: "Premium", rooms: 1, house: "Flat", expected: 12000 },
  { plan: "Premium", rooms: 2, house: "Flat", expected: 24000 },
  { plan: "Basic", rooms: 1, house: "Studio", expected: 7000 }, // 7000 * 0.8
  { plan: "Basic", rooms: 2, house: "Studio", expected: 14000 }, // 10000 * 0.8
];

let failed = false;
tests.forEach((t) => {
  const result = calculate(t.plan, t.rooms, t.house);
  if (result !== t.expected) {
    console.error(
      `FAILED: ${t.plan} ${t.rooms} ${t.house}. Expected ${t.expected}, got ${result}`,
    );
    failed = true;
  } else {
    console.log(`PASSED: ${t.plan} ${t.rooms} ${t.house} = ${result}`);
  }
});

if (failed) process.exit(1);
console.log("All tests passed");
