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
    <div className="max-w-7xl mx-auto px-6 py-24 lg:py-36 font-sans">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Pricing Plans</h1>
          <p className="text-slate-500 mt-3 text-lg max-w-xl leading-relaxed">
            Simple, transparent pricing for every home. Choose the plan that fits your lifestyle.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl ${plan.name === "Standard"
              ? "bg-white border-sky-200 shadow-xl scale-105 z-10"
              : "bg-white border-slate-100 shadow-lg hover:border-sky-100"
              }`}
          >
            {plan.name === "Standard" && (
              <div className="absolute top-0 right-0 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="text-sm text-slate-500 mt-2 min-h-[40px]">{plan.desc}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-500 font-medium mb-1">As low as</p>
              <span className="text-4xl font-bold text-slate-900">
                {formatNGN(plan.weekly)}
              </span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <svg
                    className="w-5 h-5 text-sky-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("openQuoteModal"))}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.name === "Standard"
                ? "bg-sky-600 text-white hover:bg-sky-700 shadow-lg hover:shadow-sky-600/30"
                : "bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
                }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
