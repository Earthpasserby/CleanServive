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
    <div className="max-w-7xl mx-auto px-6 py-24 lg:py-20 font-sans">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Pricing Plans</h1>
          <p className="text-slate-500 mt-3 text-lg max-w-xl leading-relaxed">
            Simple, transparent pricing for every home. Choose the plan that fits your lifestyle.
          </p>
        </div>
      </header>

      {/* Hero CTA: starting price */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <div className="text-sm font-semibold tracking-wider text-green-400 uppercase mb-1">Starting from</div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight">
            {formatNGN(4000)}
          </div>
          <div className="mt-2 text-slate-300 max-w-md">
            Base price for a standard room. Final price varies by plan and home size.
          </div>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <button
            type="button"
            className="btn-primary bg-white text-slate-900 hover:bg-gray-100 hover:text-slate-900 border-0 shadow-lg hover:shadow-xl"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openQuoteModal"))
            }
          >
            Get an Instant Quote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {plans.map((p, idx) => (
          <div key={p.name} className={`card-box flex flex-col h-full transition-all duration-300 ${p.name === 'Standard' ? 'border-green-500 ring-1 ring-green-500 shadow-lg scale-105 z-10' : 'bg-white hover:border-green-200'}`}>
            {p.name === 'Standard' && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900">{p.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-sm text-slate-500 font-medium block mb-1">
                As low as
              </span>
              <span className="text-4xl font-bold text-gray-900 tracking-tight">
                {formatNGN(p.weekly ?? Math.round(p.monthly / 4))}
              </span>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">{p.desc}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-600 text-sm">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`w-full py-3 rounded-xl font-semibold transition-all ${p.name === 'Standard'
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openQuoteModal"))
              }
            >
              Choose {p.name}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Compare Features</h2>
          <p className="text-slate-500 mt-2">Detailed breakdown of what's included in each plan</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="p-4 text-center text-sm font-semibold text-gray-900 w-1/5">Basic</th>
                  <th className="p-4 text-center text-sm font-semibold text-green-700 w-1/5 bg-green-50/50">Standard</th>
                  <th className="p-4 text-center text-sm font-semibold text-gray-900 w-1/5">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: "Dusting & Mopping", basic: true, standard: true, premium: true },
                  { name: "Bathroom & Kitchen Surfaces", basic: true, standard: true, premium: true },
                  { name: "Appliance Exteriors & Microwave", basic: false, standard: true, premium: true },
                  { name: "Spot-clean Walls & Doors", basic: false, standard: true, premium: true },
                  { name: "Deep Kitchen (Degreasing)", basic: false, standard: false, premium: true },
                  { name: "Descaling & Grout", basic: false, standard: false, premium: true },
                  { name: "Eco-friendly Supplies", basic: "Optional", standard: "Optional", premium: "Included" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-700">{row.name}</td>
                    <td className="p-4 text-center">
                      {row.basic === true ? <span className="text-green-500">●</span> : row.basic === false ? <span className="text-slate-300">—</span> : <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{row.basic}</span>}
                    </td>
                    <td className="p-4 text-center bg-green-50/30">
                      {row.standard === true ? <span className="text-green-600">●</span> : row.standard === false ? <span className="text-slate-300">—</span> : <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{row.standard}</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.premium === true ? <span className="text-green-500">●</span> : row.premium === false ? <span className="text-slate-300">—</span> : <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">{row.premium}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantee & CTA */}
      <section className="mt-16 relative overflow-hidden rounded-3xl bg-green-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Satisfaction Guaranteed</h3>
          <p className="text-green-50 text-lg opacity-90">See Dirt? Think Scrubb. We promise a spotless shine every time.</p>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <button
            type="button"
            className="w-full md:w-auto px-8 py-4 bg-white text-green-700 font-bold rounded-xl shadow-lg hover:bg-green-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openQuoteModal"))
            }
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}
