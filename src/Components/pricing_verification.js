
const PLAN_RATE = {
    Basic: { first: 7000, extra: 3000 },
    Standard: { first: 10500, extra: 4500 },
    Premium: { first: 18000, extra: 8000 },
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
    const baseAmount = rates.first + (Math.max(0, rooms - 1) * rates.extra);
    const mult = HOUSE_MULTIPLIER[houseType] || 1;
    return Math.round(baseAmount * mult);
}

const tests = [
    { plan: 'Basic', rooms: 1, house: 'Flat', expected: 7000 },
    { plan: 'Basic', rooms: 2, house: 'Flat', expected: 10000 },
    { plan: 'Basic', rooms: 3, house: 'Flat', expected: 13000 },
    { plan: 'Standard', rooms: 1, house: 'Flat', expected: 10500 },
    { plan: 'Standard', rooms: 2, house: 'Flat', expected: 15000 },
    { plan: 'Premium', rooms: 1, house: 'Flat', expected: 18000 },
    { plan: 'Premium', rooms: 2, house: 'Flat', expected: 26000 },
    { plan: 'Basic', rooms: 1, house: 'Studio', expected: 5600 }, // 7000 * 0.8
    { plan: 'Basic', rooms: 2, house: 'Studio', expected: 8000 }, // 10000 * 0.8
];

let failed = false;
tests.forEach(t => {
    const result = calculate(t.plan, t.rooms, t.house);
    if (result !== t.expected) {
        console.error(`FAILED: ${t.plan} ${t.rooms} ${t.house}. Expected ${t.expected}, got ${result}`);
        failed = true;
    } else {
        console.log(`PASSED: ${t.plan} ${t.rooms} ${t.house} = ${result}`);
    }
});

if (failed) process.exit(1);
console.log("All tests passed");
