import React from "react";
import { FaRegCalendarAlt, FaBroom, FaHandsHelping } from "react-icons/fa";

const Step = ({ icon, title, desc }) => (
  <div className="card-box card-cream transform transition-transform duration-500 hover:scale-[1.03] fade-up">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-white text-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-accent">{title}</h4>
        <p className="text-muted mt-1">{desc}</p>
      </div>
    </div>
  </div>
);

const Testimonial = ({ quote, name }) => (
  <div className="card-box card-cream animate-float fade-up">
    <p className="text-muted">"{quote}"</p>
    <p className="mt-3 !text-[#0077b6] font-semibold">— {name}</p>
  </div>
);

export default function HomeExtras() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-accent">How it works</h2>
        <p className="text-muted mt-2 max-w-2xl mx-auto">
          Booking a clean takes only a few simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <Step
          icon={<FaRegCalendarAlt />}
          title="Choose a date"
          desc="Pick a time that suits your schedule."
        />
        <Step
          icon={<FaBroom />}
          title="We clean"
          desc="Our trained staff arrive and do the job quickly and thoroughly."
        />
        <Step
          icon={<FaHandsHelping />}
          title="Relax"
          desc="Enjoy a fresh, clean space — satisfaction guaranteed."
        />
      </div>

      <div className="mt-24 text-center">
        <h3 className="text-2xl font-bold  !text-[#9b741b]   text-accent">
          What customers say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Testimonial
            quote="They arrived on time and did an amazing job."
            name="Olivia"
          />
          <Testimonial
            quote="Great attention to detail and polite staff."
            name="James"
          />
          <Testimonial
            quote="Easy booking and fantastic service."
            name="Lina"
          />
        </div>
      </div>
    </section>
  );
}
