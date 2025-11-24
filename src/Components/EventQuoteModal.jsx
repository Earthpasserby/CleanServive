import React, { useEffect, useRef, useState } from "react";

// Business WhatsApp number
const WHATSAPP_NUMBER = "2347067876791";

export default function EventQuoteModal() {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState("");
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        venueAddress: "",
        guestCount: "",
        services: {
            preEvent: false,
            duringEvent: false,
            postEvent: false,
            dishwashing: false,
        },
        additionalDetails: "",
    });
    const [errors, setErrors] = useState({});
    const firstInput = useRef(null);

    // smallest allowed date is today
    function formatLocalDateInput(date) {
        const pad = (n) => String(n).padStart(2, "0");
        return (
            date.getFullYear() +
            "-" +
            pad(date.getMonth() + 1) +
            "-" +
            pad(date.getDate()) +
            "T" +
            pad(date.getHours()) +
            ":" +
            pad(date.getMinutes())
        );
    }
    const minDateTime = formatLocalDateInput(new Date());

    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener("openEventModal", handler);
        return () => window.removeEventListener("openEventModal", handler);
    }, []);

    useEffect(() => {
        if (open && firstInput.current) firstInput.current.focus();
    }, [open]);

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setOpen(false);
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = "Please enter your name";
        if (!form.phone.trim()) errs.phone = "Please enter a contact phone";
        if (!form.eventType.trim()) errs.eventType = "Please specify the event type";
        if (!form.eventDate) errs.eventDate = "Please select a date";
        if (!form.venueAddress.trim()) errs.venueAddress = "Please enter the venue address";

        const hasService = Object.values(form.services).some(Boolean);
        if (!hasService) errs.services = "Please select at least one service";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const toggleService = (key) => {
        setForm(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [key]: !prev.services[key]
            }
        }));
    };

    function sendToWhatsApp(message) {
        const digits = (WHATSAPP_NUMBER || "").replace(/\D/g, "");
        const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);

        const selectedServices = Object.entries(form.services)
            .filter(([_, selected]) => selected)
            .map(([key]) => {
                switch (key) {
                    case 'preEvent': return 'Pre-Event Cleaning';
                    case 'duringEvent': return 'During Event Support';
                    case 'postEvent': return 'Post-Event Cleanup';
                    case 'dishwashing': return 'Dishwashing Service';
                    default: return key;
                }
            })
            .join(", ");

        const message = [
            "🎉 New Event Cleaning Request",
            `Name: ${form.name}`,
            `Phone: ${form.phone}`,
            form.email ? `Email: ${form.email}` : null,
            `Event Type: ${form.eventType}`,
            `Date: ${form.eventDate}`,
            form.venueAddress ? `Venue: ${form.venueAddress}` : null,
            form.guestCount ? `Est. Guests: ${form.guestCount}` : null,
            `Services Needed: ${selectedServices}`,
            form.additionalDetails ? `Details: ${form.additionalDetails}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        setTimeout(() => {
            try {
                sendToWhatsApp(message);
                setToast("Opened WhatsApp");
                setTimeout(() => setToast(""), 3000);
                setSubmitted(true);
            } finally {
                setSubmitting(false);
            }
        }, 300);
    }

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setOpen(false)}
                />

                <div
                    className={`relative w-full max-w-2xl bg-gray-900 text-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] border border-gray-800 transition-all duration-300 transform ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
                        }`}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-800 shrink-0">
                        <div>
                            <h3 className="text-xl font-bold text-white">Event Cleaning Quote</h3>
                            <p className="text-sm text-gray-400 mt-1">Let us handle the mess at your next event</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="overflow-y-auto p-6 custom-scrollbar">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Full Name</span>
                                        <input
                                            ref={firstInput}
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                            placeholder="Your Name"
                                        />
                                        {errors.name && <div className="text-xs text-red-400 mt-1 ml-1">{errors.name}</div>}
                                    </label>

                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Phone</span>
                                        <input
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                            placeholder="+234..."
                                        />
                                        {errors.phone && <div className="text-xs text-red-400 mt-1 ml-1">{errors.phone}</div>}
                                    </label>

                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Email (Optional)</span>
                                        <input
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                            placeholder="you@example.com"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Event Type</span>
                                        <select
                                            name="eventType"
                                            value={form.eventType}
                                            onChange={handleChange}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Birthday Party">Birthday Party</option>
                                            <option value="Corporate Event">Corporate Event</option>
                                            <option value="Dinner Party">Dinner Party</option>
                                            <option value="Concert/Festival">Concert/Festival</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.eventType && <div className="text-xs text-red-400 mt-1 ml-1">{errors.eventType}</div>}
                                    </label>

                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Event Date & Time</span>
                                        <input
                                            type="datetime-local"
                                            name="eventDate"
                                            value={form.eventDate}
                                            onChange={handleChange}
                                            min={minDateTime}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                        />
                                        {errors.eventDate && <div className="text-xs text-red-400 mt-1 ml-1">{errors.eventDate}</div>}
                                    </label>

                                    <label className="block">
                                        <span className="block text-sm font-medium text-gray-300 mb-1">Estimated Guests</span>
                                        <input
                                            type="number"
                                            name="guestCount"
                                            value={form.guestCount}
                                            onChange={handleChange}
                                            className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                            placeholder="e.g. 50"
                                        />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="block text-sm font-medium text-gray-300 mb-1">Venue Address</span>
                                    <input
                                        name="venueAddress"
                                        value={form.venueAddress}
                                        onChange={handleChange}
                                        className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                        placeholder="Full address of the venue"
                                    />
                                    {errors.venueAddress && <div className="text-xs text-red-400 mt-1 ml-1">{errors.venueAddress}</div>}
                                </label>

                                <div className="block">
                                    <span className="block text-sm font-medium text-gray-300 mb-3">Services Needed</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { label: "Pre-Event Cleaning", key: "preEvent", desc: "Setting up and cleaning before guests arrive" },
                                            { label: "During Event Support", key: "duringEvent", desc: "Maintaining cleanliness during the event" },
                                            { label: "Post-Event Cleanup", key: "postEvent", desc: "Deep cleaning after the event ends" },
                                            { label: "Dishwashing Service", key: "dishwashing", desc: "Professional washing of plates and cutlery" },
                                        ].map(({ label, key, desc }) => (
                                            <label key={key} className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${form.services[key] ? 'border-green-500 bg-green-900/20' : 'border-gray-700 hover:bg-gray-800'}`}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.services[key]}
                                                        onChange={() => toggleService(key)}
                                                        className="h-4 w-4 rounded border-gray-600 text-green-500 focus:ring-green-500 bg-gray-700"
                                                    />
                                                    <span className="font-medium text-white">{label}</span>
                                                </div>
                                                <span className="text-xs text-gray-400 ml-6">{desc}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.services && <div className="text-xs text-red-400 mt-2 ml-1">{errors.services}</div>}
                                </div>

                                <label className="block">
                                    <span className="block text-sm font-medium text-gray-300 mb-1">Additional Details</span>
                                    <textarea
                                        name="additionalDetails"
                                        value={form.additionalDetails}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                                        placeholder="Any specific requirements or questions..."
                                    />
                                </label>

                                {/* Review Summary */}
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 space-y-3 mt-2">
                                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wide border-b border-gray-700 pb-2">Review Details</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-xs text-gray-500">Contact</span>
                                            <span className="block font-medium text-white">{form.name || "-"}</span>
                                            <span className="block text-gray-400 text-xs">{form.phone || "-"}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500">Event</span>
                                            <span className="block font-medium text-white">{form.eventType || "-"}</span>
                                            <span className="block text-gray-400 text-xs truncate">{form.eventDate ? new Date(form.eventDate).toLocaleDateString() : "-"}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="block text-xs text-gray-500">Services</span>
                                            <span className="block font-medium text-green-400">
                                                {Object.entries(form.services)
                                                    .filter(([_, selected]) => selected)
                                                    .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim())
                                                    .join(", ") || "None selected"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-5 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold shadow-lg hover:shadow-green-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Sending..." : "Get Event Quote"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                                <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white">Request Sent!</h4>
                                <p className="text-gray-400 mt-2 max-w-xs mx-auto">
                                    We've opened WhatsApp with your event details. We'll confirm availability shortly.
                                </p>
                                <div className="mt-8">
                                    <button
                                        type="button"
                                        className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 font-medium transition-colors"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setOpen(false);
                                            setForm({
                                                name: "",
                                                phone: "",
                                                email: "",
                                                eventType: "",
                                                eventDate: "",
                                                venueAddress: "",
                                                guestCount: "",
                                                services: {
                                                    preEvent: false,
                                                    duringEvent: false,
                                                    postEvent: false,
                                                    dishwashing: false,
                                                },
                                                additionalDetails: "",
                                            });
                                            setErrors({});
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {toast && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-md z-60 border border-gray-800">
                    {toast}
                </div>
            )}
        </>
    );
}
