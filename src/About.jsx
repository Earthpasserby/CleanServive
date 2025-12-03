import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      {/* Hero */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"> */}
      {/* <div> */}
      {/* <h1 className="text-4xl lg:text-5xl font-extrabold text-accent"> */}
      {/* About Our Cleaning Service */}
      {/* </h1> */}
      {/* <p className="text-muted mt-4 max-w-2xl leading-relaxed"> */}
      {/* We deliver dependable, professional cleaning solutions for homes and */}
      {/* businesses. Our trained team uses modern equipment and eco-friendly */}
      {/* materials to ensure your space is safe, healthy and sparkling. */}
      {/* </p> */}
      {/* <div className="mt-6 flex items-center gap-3"> */}
      {/* <Link to="/pricing" className="btn-primary"> */}
      {/* See Pricing */}
      {/* </Link> */}
      {/* <button */}
      {/* type="button" */}
      {/* onClick={() => */}
      {/* window.dispatchEvent(new CustomEvent("openQuoteModal")) */}
      {/* } */}
      {/* className="btn-accent" */}
      {/* > */}
      {/* Request a Quote */}
      {/* </button> */}
      {/* </div> */}
      {/* </div> */}
      {/* <div> */}
      {/* <img */}
      {/* // src={holdingBucket} */}
      {/* // alt="cleaning" // className="rounded-lg shadow-lg w-full */}
      {/* object-cover" // /> */}
      {/* </div> */}
      {/* </div> */}

      {/* Team */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Meet the Team</h2>
        <p className="text-muted mt-2 max-w-2xl">
          Our crew is experienced, background-checked and trained to deliver
          reliable service every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="card-box card-cream animate-float">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                I
              </div>
              <div>
                <h4 className="text-lg font-semibold">Iwuno Samuel</h4>
                <p className="text-muted text-sm">Operations Manager</p>
              </div>
            </div>
          </div>
          <div className="card-box card-cream animate-float">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                J
              </div>
              <div>
                <h4 className="text-lg font-semibold">Joshua Craig</h4>
                <p className="text-muted text-sm">Senior Technician</p>
              </div>
            </div>
          </div>
          <div className="card-box card-cream animate-float">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <h4 className="text-lg font-semibold">Mariam Khan</h4>
                <p className="text-muted text-sm">Customer Success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-box card-cream">
          <h3 className="text-xl font-semibold text-sky-700">Our Mission</h3>
          <p className="text-muted mt-2">
            To provide reliable cleaning services that create safe, healthy, and
            welcoming environments for our clients.
          </p>
        </div>
        <div className="card-box card-cream">
          <h3 className="text-xl font-semibold text-sky-700">Our Values</h3>
          <ul className="text-muted mt-2 list-disc pl-5 space-y-2">
            <li>Professionalism in every job</li>
            <li>Clear, fair pricing</li>
            <li>Customer satisfaction guarantee</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-3">
          <details className="card-box card-cream">
            <summary className="font-medium">
              What's included in Basic cleaning?
            </summary>
            <div className="text-muted mt-2">
              <p className="mb-2">
                Our Basic plan covers essential, reliable cleaning for everyday
                upkeep. Typical tasks include:
              </p>
              <ul className="list-disc pl-5">
                <li>Dusting of surfaces and fixtures</li>
                {/* <li>Vacuuming carpets and rugs</li> / */}
                <li>Mopping hard floors</li>
                <li>Kitchen surface cleaning and sink</li>
                <li>Bathroom cleaning (toilet, shower, mirror, surfaces)</li>
                <li>Emptying bins and basic tidying</li>
              </ul>
            </div>
          </details>

          <details className="card-box card-cream">
            <summary className="font-medium">
              What's included in Standard cleaning?
            </summary>
            <div className="text-muted mt-2">
              <p className="mb-2">
                Standard builds on Basic with extra attention to
                commonly-requested areas and light deep-clean tasks:
              </p>
              <ul className="list-disc pl-5">
                <li>All Basic tasks</li>
                <li>Detailed dusting (including light fixtures and vents)</li>
                <li>
                  Cleaning inside microwave and wipe-down of appliance exteriors
                </li>
                <li>Spot-cleaning of walls and doors</li>
                <li>Floor edges and corners attention</li>
                <li>Extra time allocated for high-traffic areas</li>
              </ul>
            </div>
          </details>

          <details className="card-box card-cream">
            <summary className="font-medium">
              What's included in Premium cleaning?
            </summary>
            <div className="text-muted mt-2">
              <p className="mb-2">
                Premium is a deeper, more thorough service that includes
                everything in Basic plus additional tasks for a full refresh:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  Deep-cleaning of kitchens (inside appliance exteriors,
                  degreasing)
                </li>
                <li>Cleaning inside cabinets and drawers (on request)</li>
                <li>Detailed bathroom descaling and grout attention</li>
                <li>Baseboards, window sills and door frames wiped down</li>
                <li>
                  Upholstery spot-cleaning and extra attention to high-touch
                  areas
                </li>
                <li>
                  Optional add-ons: oven cleaning, deep carpet/steam cleaning
                  (available at extra cost)
                </li>
              </ul>
            </div>
          </details>

          <details className="card-box card-cream">
            <summary className="font-medium">
              Event standby cleaners & dishwashers — what are they?
            </summary>
            <div className="text-muted mt-2">
              <p className="mb-2">
                Yes — we provide short-term staffing for events. This includes
                two common options:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Standby cleaners:</strong> Attendants who keep the
                  venue tidy during the event (clearing tables, managing spills,
                  restocking supplies, quick turnarounds between sessions) and
                  perform a post-event clean.
                </li>
                <li>
                  <strong>Event dishwashing support:</strong> Trained staff to
                  manage on-site dishwashing, glassware care, and kitchen
                  support during catering operations.
                </li>
              </ul>
              <p className="mt-2">
                Bookings usually require a minimum number of hours and at least
                24–48 hours' notice for scheduling; we can include event
                staffing on your quote — just select "Event" or mention it in
                the special requests field.
              </p>
            </div>
          </details>

          <details className="card-box card-cream">
            <summary className="font-medium">
              Do you use eco-friendly products?
            </summary>
            <p className="text-muted mt-2">
              Yes — we use EPA-approved products and can provide fragrance-free
              or eco-friendly options on request. Let us know any sensitivities
              in the special requests field.
            </p>
          </details>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-accent">What Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card-box card-cream">
            <p className="text-muted">
              "Fast, thorough and professional. My apartment looks brand new!"
            </p>
            <p className="mt-3 font-semibold">— Sarah L.</p>
          </div>
          <div className="card-box card-cream">
            <p className="text-muted">
              "Great communication and very accommodating to our schedule."
            </p>
            <p className="mt-3 font-semibold">— Daniel R.</p>
          </div>
          <div className="card-box card-cream">
            <p className="text-muted">
              "Excellent value and attention to detail. Highly recommended."
            </p>
            <p className="mt-3 font-semibold">— Maria K.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 bg-gradient-to-r from-white to-white-100 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Ready to get started?</h3>
            <p className="text-muted mt-1">
              Book a cleaning or request a quote in just a few clicks.
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
  );
}
