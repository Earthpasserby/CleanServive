import React from "react";

// Replace this with your actual Google Form URL
const GOOGLE_FORM_URL = "https://forms.gle/your-form-id";

export default function JoinTeam() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Join our cleaning team
          </h2>
          <p className="mt-3 text-muted-dark">
            We're growing — if you're reliable, hardworking and passionate about
            providing great cleaning service, we'd love to hear from you. Click
            the button to apply; it opens a short Google Form where you can tell
            us about your experience and availability.
          </p>

          <div className="mt-6">
            <a
              className="btn-primary"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Apply to join
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          {/* Put an image named `join-team.jpg` in `public/` or change the path */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/join-team.jpg"
              alt="Join our team"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
