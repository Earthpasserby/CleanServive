import React, { useState } from "react";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  const formatNGN = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  // Prices converted to NGN from USD values using a conversion rate.
  // Assumption: 1 USD = 1500 NGN (change this rate if you prefer a different conversion).
  const USD_TO_NGN = 1500;

  const plans = [
    {
      name: "Basic",
      // original: $29/mo -> converted to NGN
      monthly: 42 * USD_TO_NGN, // 43,500
      yearly: 29 * USD_TO_NGN * 12,
      desc: "Standard home cleaning Twice a week",
      features: [
        "In house Sweeping",
        "Rooms Mopping",
        "Dusting",
        "Trash Removal",
        "Bathroom Cleaning",
        "Kitchen Cleaning",
      ],
    },
    {
      name: "Standard",
      // original: $49/mo
      monthly: 95 * USD_TO_NGN, // 73,500
      yearly: 49 * USD_TO_NGN * 12,
      desc: "Basic and Deep cleaning for small homes",
      features: [
        "Deep clean",
        "Room Dressing/Mopping",
        "Bathroom Sanitization",
        "kitchen Scrubbing",
        "Appliance Cleaning",
        "Compound Sweeping",
      ],
    },
    {
      name: "Premium",
      // original: $79/mo
      monthly: 150 * USD_TO_NGN, // 118,500
      yearly: 79 * USD_TO_NGN * 12,
      desc: "Full home cleaning + extras",
      features: [
        "All rooms",
        "Move-in/out options",
        "Deep Cleaning",
        "Window cleaning",
        "lundry Service",
        "Eco-friendly supplies",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-accent">Pricing Plans</h1>
          <p className="text-muted mt-2 max-w-xl">
            Simple plans with transparent pricing — choose Weekly or Monthly
            billing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBilling("weekly")}
            className={`px-4 py-2 rounded-full ${
              billing === "weekly" ? "btn-primary" : "btn-accent"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full ${
              billing === "monthly" ? "btn-primary" : "btn-accent"
            }`}
          >
            Monthly
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {plans.map((p) => (
          <div key={p.name} className="card-box card-cream">
            <h3 className="text-xl font-semibold text-accent">{p.name}</h3>
            <p className="text-2xl font-bold mt-2">
              {billing === "monthly"
                ? `${formatNGN(p.monthly)}/mo`
                : `${formatNGN(p.weekly ?? Math.round(p.monthly / 4))}/wk`}
            </p>
            <p className="text-muted mt-2">{p.desc}</p>
            <ul className="text-muted mt-3 list-disc pl-5 space-y-1">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
              >
                Choose {p.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-accent">Compare Plans</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="text-left">
                <th className="p-3">Feature</th>
                <th className="p-3">Basic</th>
                <th className="p-3">Standard</th>
                <th className="p-3">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Deep Clean</td>
                <td className="p-3">—</td>
                <td className="p-3">✓</td>
                <td className="p-3">✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3">Eco Supplies</td>
                <td className="p-3">—</td>
                <td className="p-3">—</td>
                <td className="p-3">✓</td>
              </tr>
              <tr>
                <td className="p-3">Priority Booking</td>
                <td className="p-3">—</td>
                <td className="p-3">✓</td>
                <td className="p-3">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Guarantee & CTA */}
      <section className="mt-12 card-box card-primary text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
          <p className="mt-1 opacity-90">
            If you're not satisfied with the clean, we'll make it right.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn-accent"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openQuoteModal"))
            }
          >
            Request a Quote
          </button>
        </div>
      </section>
    </div>
  );
}
