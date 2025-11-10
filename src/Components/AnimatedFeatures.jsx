import React from "react";

const FeatureCard = ({ icon, title, text }) => (
  <div className="card-box card-cream animate-float">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
        <span className="font-bold text-white">{icon}</span>
      </div>
      <div>
        <h4 className="text-lg !text-[#9b741b]  font-semibold text-accent">
          {title}
        </h4>
        <p className="text-muted text-sm">{text}</p>
      </div>
    </div>
  </div>
);

export default function AnimatedFeatures() {
  const features = [
    { icon: "A", title: "Trusted Teams", text: "Vetted and trained staff" },
    { icon: "B", title: "Eco Friendly", text: "We use safe materials" },
    { icon: "C", title: "Flexible", text: "Book online or via call" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
