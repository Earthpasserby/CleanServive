import React from "react";

export default function Pricing() {
  // Pricing is presented as weekly-focused. No billing toggle.

  const formatNGN = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  const plans = [
    {
      name: "Basic",
      weekly: 15000,
      monthly: 15000 * 4,
      desc: "Essential cleaning for everyday upkeep.",
      color: "sky",
      icon: (
        <svg
          className="w-8 h-8 text-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
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
      weekly: 30000,
      monthly: 30000 * 4,
      desc: "Detailed cleaning with attention to appliances.",
      color: "blue",
      popular: true,
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
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
      weekly: 60000,
      monthly: 60000 * 4,
      desc: "Deep cleaning & full home refresh.",
      color: "indigo",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      features: [
        "All Standard features",
        "Deep kitchen clean (degreasing)",
        "Inside cabinets (on request)",
        "Bathroom descaling & grout",
        "Upholstery spot-cleaning",
        "Eco-friendly supplies included",
      ],
    },
  ];

  const officePlans = [
    {
      name: "Basic Care",
      cadence: "Best for small offices",
      features: [
        "Weekly office cleaning",
        "Trash removal",
        "Desk dusting",
        "Restroom cleaning",
      ],
      accent: "blue",
    },
    {
      name: "Standard ",
      cadence: "Best for growing offices",
      features: [
        "3x weekly cleaning",
        "Floor care",
        "Desk & equipment dusting",
        "Restroom sanitation",
        "Waste disposal",
      ],
      accent: "blue",
    },
    {
      name: "Premium",
      cadence: " Large offices & corporate buildings",
      features: [
        "Daily cleaning",
        "Deep sanitation",
        "Window cleaning",
        "Carpet care",
        "Dedicated cleaning staff",
        "Cleaning supervision",
      ],
      accent: "blue",
    },
  ];

  return (
    <div className="relative font-sans overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-sky-50 via-white to-sky-50 opacity-70 pointer-events-none" />
      <div className="absolute top-20 -left-64 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-40 -right-64 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 relative z-10">
        <header className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex mt-12 items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-6 shadow-sm">
            <svg
              className="w-4 h-4"
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
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Sparkling Homes,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">
              Simple Math.
            </span>
          </h1>
          <p className="text-slate-600 md:text-lg leading-relaxed">
            Choose the perfect level of clean. Every plan includes vetted
            professionals, premium equipment, and our 100% satisfaction
            guarantee.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-white border-blue-200 shadow-2xl xl:scale-105 z-10"
                  : "bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl hover:shadow-2xl hover:border-sky-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-sky-700 to-sky-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6 mt-2">
                <div
                  className={`p-3 rounded-2xl bg-${plan.color}-50 ring-1 ring-${plan.color}-100/50 text-${plan.color}-500`}
                >
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-8 min-h-[40px] leading-relaxed">
                {plan.desc}
              </p>

              <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-100/50">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl lg:text-4xl font-black text-slate-900 tracking-tighter`}
                  >
                    {formatNGN(plan.weekly)}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-2 font-medium">
                  per week (discounted)
                </p>
              </div>

              <ul className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-${plan.color}-50 flex items-center justify-center`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 text-${plan.color}-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? "bg-gradient-to-r from-sky-600 to-sky-700 text-white hover:from-blue-700 hover:to-sky-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                <span>Select {plan.name}</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <div className="rounded-[2.5rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 md:p-12 shadow-[0_30px_80px_-60px_rgba(37,99,235,0.5)]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-widest">
                  Office Plans
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4">
                  Office Cleaning,{" "}
                  <span className="text-sky-600">made simple.</span>
                </h2>
                <p className="text-slate-600 mt-3 max-w-2xl">
                  Choose a cadence that fits your workplace traffic and keep
                  your team focused in a spotless space.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="btn-primary"
              >
                Request Office Quote
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {officePlans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-3xl border border-white bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <span
                      className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-full"
                    >
                      {plan.cadence}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          className={`mt-1 w-2 h-2 rounded-full bg-${plan.accent}-400`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-6">
              Office/workspace quotes include an inspection fee before service
              begins.
            </p>
          </div>
        </section>

        {/* Bottom Banner Area */}
        <div className="mt-24 max-w-4xl mx-auto border border-sky-100 bg-gradient-to-b from-sky-50/50 to-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50" />
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-sky-100 rounded-full text-sky-600">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Need something specialized?
          </h3>
          <p className="text-slate-600 md:text-lg mb-8 max-w-2xl mx-auto">
            We also offer Post-Construction cleanup, deep Move In/Out services,
            and organization blocks. Request a custom quote to get pricing
            tailored just for you.
          </p>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openQuoteModal"))
            }
            className="btn-primary flex items-center gap-2 mx-auto group"
          >
            <span>Get Custom Quote</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
