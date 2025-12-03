import React from "react";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
// import scrubb from "../assets/scrubb logo.png";

// Replace this with your actual Google Form URL
const GOOGLE_FORM_URL = "https://forms.gle/BTCTMdHi4kZrmPhE8";

export default function JoinTeam() {
  return (
    <section className="bg-white/80 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center bg-brand-light">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-white/30 text-sky-700">
                <FaUsers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-sky-800">
                Join our Scrubb team
              </h3>
            </div>

            <p className="mt-4 text-slate-600">
              We're expanding our team. If you're reliable, hardworking and take
              pride in delivering exceptional Scrubb, apply now — it only takes
              a minute to fill the short form. We'll review your application and
              get in touch.
            </p>

            <ul className="mt-6 space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <FaCheckCircle /> Competitive pay
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle /> Flexible schedules
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle /> Training and growth
              </li>
            </ul>

            <div className="mt-6">
              <a
                href={"https://forms.gle/BTCTMdHi4kZrmPhE8"}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block btn-primary"
                aria-label="Apply to join our cleaning team (opens in new tab)"
              >
                Apply to join
              </a>
            </div>
          </div>

          <div className="h-64 md:h-auto">
            {/* Add an image named `join-team.jpg` to `public/` or change path */}
            <img
              src="/scrubb logo.png"
              alt="Scrubb Team"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
