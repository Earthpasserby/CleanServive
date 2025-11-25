import React from "react";
import { FaGlassCheers, FaUtensils } from "react-icons/fa";

export default function EventDishwasher() {
    const openModal = () => {
        window.dispatchEvent(new Event("openEventModal"));
    };

    return (
        <section className="relative py-20 bg-slate-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-500 blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-teal-500 blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-slate-800 border border-slate-700 shadow-lg animate-bounce-slow">
                    <FaGlassCheers className="text-teal-400 text-xl mr-2" />
                    <span className="text-slate-300 font-medium tracking-wide text-sm uppercase">
                        Party & Event Support
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Hosting an Event? <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
                        We'll Handle the Mess.
                    </span>
                </h2>

                <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed">
                    From pre-party prep to post-party cleanup, our professional event cleaners and dishwashers ensure your venue stays spotless so you can focus on your guests.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={openModal}
                        className="group relative px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Book Event Cleaners
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>

                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50">
                        <FaUtensils className="text-gray-400" />
                        <span>Professional Dishwashers Available</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
