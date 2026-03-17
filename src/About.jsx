import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute top-64 -left-28 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 mt-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-8 shadow-[0_25px_60px_-45px_rgba(14,165,233,0.6)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-sky-700 text-xs font-semibold uppercase tracking-widest">
              About ScrubbPro
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-5">
              Why ScrubbPro? <br />
            </h1>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600">
              keep your hands clean and ours dirty
            </p>
            <p className="text-slate-600 mt-4 leading-relaxed">
              ScrubbPro was born from a simple desire for clean, well kept
              spaces which evolved into a commitment to delivering exceptional
              cleaning experiences. With trained professionals, transparent
              pricing, and modern tools, we create environments that are not
              just clean, but truly cared for. Bringing you peace of mind and
              the freedom to focus on what matters most.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/pricing" className="btn-primary">
                View Plans
              </Link>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="btn-accent"
              >
                Request Quote
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.25)]">
            <h2 className="text-3xl font-bold text-slate-900">
              The ScrubbPro Difference
            </h2>
            <p className="text-slate-600 mt-3">
              It’s more than cleaning, it’s the feeling of walking into a space
              that’s fresh, calm, and just right. We take care of the details so
              you can relax, focus, and enjoy your space.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                Bright, welcoming spaces
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                Neat, organized work areas
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                Friendly professionals you can trust
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                Safe, eco-friendly cleaning
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Meet the Team
              </h2>
              <p className="text-muted mt-2 max-w-2xl">
                Our crew is experienced, background-checked and trained to
                deliver reliable service every time.
              </p>
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">
              Trusted professionals
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { initial: "I", name: "Samuel I", role: "Operations Manager" },
              { initial: "J", name: "Rita E", role: "Senior Technician" },
              { initial: "M", name: "Chibuike I", role: "Customer Success" },
            ].map((person) => (
              <div
                key={person.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-45px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-600 flex items-center justify-center text-white font-bold text-lg">
                    {person.initial}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {person.name}
                    </h4>
                    <p className="text-muted text-sm">{person.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-sky-700">Our Mission</h3>
            <p className="text-muted mt-3">
              To provide reliable cleaning services that create safe, healthy,
              and welcoming environments for our clients.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-sky-700">Our Values</h3>
            <ul className="text-muted mt-3 list-disc pl-5 space-y-2">
              <li>Professionalism in every job</li>
              <li>Clear, fair pricing</li>
              <li>Customer satisfaction guarantee</li>
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "What's included in Basic cleaning?",
                body: (
                  <>
                    <p className="mb-2">
                      Our Basic plan covers essential, reliable cleaning for
                      everyday upkeep. Typical tasks include:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Dusting of surfaces and fixtures</li>
                      <li>Mopping hard floors</li>
                      <li>Kitchen surface cleaning and sink</li>
                      <li>
                        Bathroom cleaning (toilet, shower, mirror, surfaces)
                      </li>
                      <li>Emptying bins and basic tidying</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "What's included in Standard cleaning?",
                body: (
                  <>
                    <p className="mb-2">
                      Standard builds on Basic with extra attention to
                      commonly-requested areas and light deep-clean tasks:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>All Basic tasks</li>
                      <li>
                        Detailed dusting (including light fixtures and vents)
                      </li>
                      <li>
                        Cleaning inside microwave and wipe-down of appliance
                        exteriors
                      </li>
                      <li>Spot-cleaning of walls and doors</li>
                      <li>Floor edges and corners attention</li>
                      <li>Extra time allocated for high-traffic areas</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "What's included in Premium cleaning?",
                body: (
                  <>
                    <p className="mb-2">
                      Premium is a deeper, more thorough service that includes
                      everything in Basic plus additional tasks for a full
                      refresh:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>
                        Deep-cleaning of kitchens (inside appliance exteriors,
                        degreasing)
                      </li>
                      <li>Cleaning inside cabinets and drawers (on request)</li>
                      <li>Detailed bathroom descaling and grout attention</li>
                      <li>
                        Baseboards, window sills and door frames wiped down
                      </li>
                      <li>
                        Upholstery spot-cleaning and extra attention to
                        high-touch areas
                      </li>
                      <li>
                        Optional add-ons: oven cleaning, deep carpet/steam
                        cleaning (available at extra cost)
                      </li>
                    </ul>
                  </>
                ),
              },
              {
                title:
                  "Event standby cleaners and dishwashers -- what are they?",
                body: (
                  <>
                    <p className="mb-2">
                      Yes -- we provide short-term staffing for events. This
                      includes two common options:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>
                        <strong>Standby cleaners:</strong> Attendants who keep
                        the venue tidy during the event (clearing tables,
                        managing spills, restocking supplies, quick turnarounds
                        between sessions) and perform a post-event clean.
                      </li>
                      <li>
                        <strong>Event dishwashing support:</strong> Trained
                        staff to manage on-site dishwashing, glassware care, and
                        kitchen support during catering operations.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Bookings usually require a minimum number of hours and at
                      least 24-48 hours' notice for scheduling; we can include
                      event staffing on your quote -- just select "Event" or
                      mention it in the special requests field.
                    </p>
                  </>
                ),
              },
              {
                title: "Do you use eco-friendly products?",
                body: (
                  <p className="text-muted mt-2">
                    Yes -- we use EPA-approved products and can provide
                    fragrance-free or eco-friendly options on request. Let us
                    know any sensitivities in the special requests field.
                  </p>
                ),
              },
            ].map((item) => (
              <details
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="font-semibold text-slate-900">
                  {item.title}
                </summary>
                <div className="text-muted mt-3">{item.body}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900">
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                quote:
                  "Fast, thorough and professional. My apartment looks brand new!",
                name: "Chisom E.",
              },
              {
                quote:
                  "Great communication and very accommodating to our schedule.",
                name: "William N.",
              },
              {
                quote:
                  "Excellent value and attention to detail. Highly recommended.",
                name: "Fatimah D.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-slate-600 italic">"{t.quote}"</p>
                <p className="mt-4 font-semibold text-slate-900">-- {t.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-r from-sky-600 to-sky-700 p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Ready to get started?</h3>
              <p className="mt-2 text-sky-100">
                Book a cleaning or request a quote in just a few clicks.
              </p>
              <p className="mt-3 text-sm text-sky-100/90">
                keep your hands clean and ours dirty
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link to="/pricing" className="btn-primary">
                View Plans
              </Link>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="btn-accent"
              >
                Request Quote
              </button>
            </div>
          </div>
        </section>
        {/* modal mounted at app layout (global) */}
      </div>
    </div>
  );
}
