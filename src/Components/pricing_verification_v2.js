
const PLAN_RATE = {
    Basic: { first: 4000, extra: 2000 },
    Standard: { first: 7500, extra: 3500 },
    Premium: { first: 12000, extra: 6000 },
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

const FREQUENCY_DISCOUNT = {
    "One-off": 0,
    "Bi-monthly": 0.05,
    "Weekly": 0.1,
    "Twice a week": 0.15,
    "3 times a week": 0.2,
    "Everyday": 0.25,
    "Recurring": 0,
};

function calculate(plan, form, houseType) {
    const totalRooms =
        (form.parlours || 0) +
        (form.bedrooms || 0) +
        (form.kitchens || 0) +
        (form.bathrooms || 0) +
        (form.officeSpaces || 0) +
        (form.garages || 0) +
        (form.stores || 0);

    if (!plan || totalRooms === 0 || !houseType) {
        return null;
    }

    const rates = PLAN_RATE[plan] || PLAN_RATE.Standard;
    const baseAmount = rates.first + (Math.max(0, totalRooms - 1) * rates.extra);
    const mult = HOUSE_MULTIPLIER[houseType] || 1;
    const discount = FREQUENCY_DISCOUNT[form.frequency] || 0;

    return Math.round(baseAmount * mult * (1 - discount));
}

const tests = [
    // Basic Flat with 1 bedroom, One-off
    // 4000
    {
        plan: 'Basic',
        house: 'Flat',
        form: { bedrooms: 1, frequency: 'One-off' },
        expected: 4000
    },
    // Basic Flat with 1 bedroom, Weekly (10% discount)
    // 4000 * 0.9 = 3600
    {
        plan: 'Basic',
        house: 'Flat',
        form: { bedrooms: 1, frequency: 'Weekly' },
        expected: 3600
    },
    // Standard Duplex with 6 rooms, Everyday (25% discount)
    // Base: 7500 + (5 * 3500) = 7500 + 17500 = 25000
    // Multiplier: 25000 * 1.4 = 35000
    // Discount: 35000 * 0.75 = 26250
    {
        plan: 'Standard',
        house: 'Duplex',
        form: { bedrooms: 2, parlours: 1, kitchens: 1, bathrooms: 2, frequency: 'Everyday' },
        expected: 26250
    }
];

let failed = false;
tests.forEach(t => {
    const result = calculate(t.plan, t.form, t.house);
    if (result !== t.expected) {
        console.error(`FAILED: ${t.plan} ${JSON.stringify(t.form)} ${t.house}. Expected ${t.expected}, got ${result}`);
        failed = true;
    } else {
        console.log(`PASSED: ${t.plan} ${JSON.stringify(t.form)} ${t.house} = ${result}`);
    }
});

if (failed) process.exit(1);
console.log("All tests passed");
