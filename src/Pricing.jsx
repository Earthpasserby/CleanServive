import React from "react";

export default function Pricing() {
  // Pricing is presented as weekly-focused. No billing toggle.

  const formatNGN = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  // Prices converted to NGN from USD values using a conversion rate.
  // Assumption: 1 USD = 1500 NGN (change this rate if you prefer a different conversion).
  const USD_TO_NGN = 1500; // Keep USD->NGN conversion constant available if needed later.

  const plans = [
    {
      name: "Basic",
      weekly: 4000,
      monthly: 4000 * 4,
      desc: "Essential cleaning for everyday upkeep.",
      features: [
        "Dusting surfaces & fixtures",
        "Mopping hard floors",
        "Trash removal",
        "Kitchen surfaces & sink",
        "Bathroom cleaning (toilet, shower, mirror)",
        "Emptying bins & tidying",
      ],
    },
    {
      name: "Standard",
      weekly: 7500,
      monthly: 7500 * 4,
      desc: "Detailed cleaning with attention to appliances.",
      features: [
        "All Basic features",
        "Detailed dusting (vents, light fixtures)",
        "Microwave & appliance exteriors",
        "Spot-cleaning walls & doors",
        "Floor edges & corners",
        "High-traffic area focus",
      ],
    },
    {
      name: "Premium",
      weekly: 12000,
      monthly: 12000 * 4,
      desc: "Deep cleaning & full home refresh.",
      features: [
        "All Standard features",
        "Deep kitchen clean (degreasing)",
        "Inside cabinets (on request)",
        "Bathroom descaling & grout",
        // "Baseboards, sills & door frames",
        "Upholstery spot-cleaning",
        "Eco-friendly supplies included",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 lg:py-20">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-accent">Pricing Plans</h1>
          <p className="text-muted mt-2 max-w-xl">
            Simple plans with transparent pricing.
          </p>
        </div>
      </header>

      {/* Hero CTA: starting price */}
      <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-brand-light to-brand-dark text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm uppercase opacity-90">Starting price</div>
          <div className="text-3xl font-extrabold mt-1">
            From {formatNGN(4000)}{" "}
          </div>
          <div className="mt-2 opacity-90">
            Prices vary by plan and number of rooms — request a quote for an
            exact price.
          </div>
        </div>
        <div className="w-full md:w-auto">
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openQuoteModal"))
            }
          >
            Request a Quote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {plans.map((p) => (
          <div key={p.name} className="card-box card-cream">
            <h3 className="text-xl font-semibold text-accent">{p.name}</h3>
            <div className="mt-2">
              <span className="text-sm text-gray-500 font-medium block">
                As low as
              </span>
              <span className="text-3xl font-bold text-accent">
                {formatNGN(p.weekly ?? Math.round(p.monthly / 4))}
              </span>
            </div>
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
                <th className="p-3 ">Feature</th>
                <th className="p-3 text-center">Basic</th>
                <th className="p-3 text-center">Standard</th>
                <th className="p-3 text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 font-medium">Dusting & Mopping</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Bathroom & Kitchen Surfaces</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Appliance Exteriors & Microwave</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Spot-clean Walls & Doors</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">✓</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Deep Kitchen (Degreasing)</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Descaling & Grout</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">✓</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Eco-friendly Supplies</td>
                <td className="p-3 text-center">Optional</td>
                <td className="p-3 text-center">Optional</td>
                <td className="p-3 text-center">Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Guarantee & CTA */}
      <section className="mt-12 card-box card-primary text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Satisfaction Guaranteed</h3>
          <p className="mt-1 opacity-90">See Dirt, Think Scrubb.</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-accent w-full sm:w-auto"
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
