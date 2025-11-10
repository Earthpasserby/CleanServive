import React, { useState } from "react";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      monthly: 29,
      yearly: 290,
      desc: "Standard home cleaning",
      features: ["1 hour per room", "Basic supplies"],
    },
    {
      name: "Standard",
      monthly: 49,
      yearly: 490,
      desc: "Deep cleaning for small homes",
      features: ["Deep clean", "2 rooms included", "Priority booking"],
    },
    {
      name: "Premium",
      monthly: 79,
      yearly: 790,
      desc: "Full home cleaning + extras",
      features: ["All rooms", "Move-in/out options", "Eco-friendly supplies"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-accent">Pricing Plans</h1>
          <p className="text-muted mt-2 max-w-xl">
            Simple plans with transparent pricing — choose monthly or yearly
            billing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full ${
              billing === "monthly" ? "btn-primary" : "btn-accent"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-full ${
              billing === "yearly" ? "btn-primary" : "btn-accent"
            }`}
          >
            Yearly
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {plans.map((p) => (
          <div key={p.name} className="card-box card-cream">
            <h3 className="text-xl font-semibold text-accent">{p.name}</h3>
            <p className="text-2xl font-bold mt-2">
              {billing === "monthly" ? `$${p.monthly}/mo` : `$${p.yearly}/yr`}
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
                <td className="p-3">✓</td>
                <td className="p-3">✓</td>
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
