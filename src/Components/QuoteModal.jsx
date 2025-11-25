import React, { useEffect, useRef, useState } from "react";

// Business WhatsApp number
const WHATSAPP_NUMBER = "2347067876791";

// Pricing maps
const PLAN_RATE = {
  Basic: { first: 4000, extra: 2000 },
  Standard: { first: 7500, extra: 3500 },
  Premium: { first: 12000, extra: 6000 },
};

const HOUSE_MULTIPLIER = {
  Studio: 0.8,
  Flat: 1,
  Condo: 1.05,
  Apartment: 1.1,
  Townhouse: 1.15,
  Duplex: 1.4,
  Bungalow: 1.2,
  Other: 1,
};

const FREQUENCY_DISCOUNT = {
  "One-off": 0,
  "Bi-monthly": 0.05,
  Weekly: 0.1,
  "Twice a week": 0.15,
  "3 times a week": 0.2,
  Everyday: 0.25,
  Recurring: 0.1,
};

const PLAN_DETAILS = {
  Basic: [
    "Dusting & Mopping",
    "Trash Removal",
    "Kitchen Surfaces & Sink",
    "Bathroom Cleaning",
  ],
  Standard: [
    "All Basic Features",
    "Appliance Exteriors",
    "Spot-clean Walls/Doors",
    "Detailed Dusting",
  ],
  Premium: [
    "All Standard Features",
    "Deep Kitchen (Degreasing)",
    "Descaling & Grout",
    "Eco-friendly Supplies",
  ],
};

const EXTRAS_PRICES = {
  balcony: 1000,
  wardrobe: 1000,
  fridge: 1500,
  fan: 500,
  oven: 1500,
  laundry: 4000,
  ironing: 2500,
  kitchenCabinet: 1500,
  compound: 3000,
  carWashing: 2000,
};

const LAGOS_LGAS = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere",
];

const ROOM_CONFIG = [
  { label: "Parlour", key: "parlours", icon: "M19 10h2a1 1 0 0 1 0 2h-1v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6H3a1 1 0 0 1 0-2h2v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1z" }, // Sofa
  { label: "Bedroom", key: "bedrooms", icon: "M2 10h20v7h-2v-3H4v3H2v-7zm2-4h7v3H4V6zm9 0h7v3h-7V6z" }, // Bed
  { label: "Kitchen", key: "kitchens", icon: "M4 20h16v-8H4v8zm2-6h12v4H6v-4zm6-12v8h-2V2h2zm-4 0v8H6V2h2zm8 0v8h-2V2h2z" }, // Utensils (Abstract)
  { label: "Bathroom", key: "bathrooms", icon: "M4 12v8h16v-8H4zm2 2h2v4H6v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z M12 2L4 10h16L12 2z" }, // House/Bath
  { label: "Office", key: "officeSpaces", icon: "M4 6h16v12H4V6zm2 2v8h12V8H6zm-2-4h16v2H4V4z" }, // Briefcase
  { label: "Garage", key: "garages", icon: "M19 13v6H5v-6H3v8h2v-2h14v2h2v-8h-2z M12 3L3 11h18L12 3z" }, // Garage
  { label: "Store", key: "stores", icon: "M4 4h16v16H4V4zm2 2v12h12V6H6z" }, // Box
];

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    lga: "",
    houseType: "",
    parlours: 0,
    bedrooms: 0,
    kitchens: 0,
    bathrooms: 0,
    officeSpaces: 0,
    garages: 0,
    stores: 0,
    extras: {
      balcony: false,
      wardrobe: false,
      fridge: false,
      fan: false,
      oven: false,
      laundry: false,
      ironing: false,
      kitchenCabinet: false,
      compound: false,
      carWashing: false,
    },
    cleaningSupplies: false,
    specialRequests: "",
    plan: "",
    frequency: "",
    preferred: "",
  });
  const [estimated, setEstimated] = useState(null);
  const [errors, setErrors] = useState({});
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const firstInput = useRef(null);
  const extrasRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (extrasRef.current && !extrasRef.current.contains(event.target)) {
        setExtrasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    const handler = () => {
      setOpen(true);
      setStep(1);
    };
    window.addEventListener("openQuoteModal", handler);
    return () => window.removeEventListener("openQuoteModal", handler);
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

  function validateStep(currentStep) {
    const errs = {};
    if (currentStep === 1) {
      if (!form.name.trim()) errs.name = "Please enter your name";
      if (!form.phone.trim()) errs.phone = "Please enter a contact phone";
      if (!form.address.trim()) errs.address = "Please enter your address";
      if (!form.lga) errs.lga = "Please select an LGA";
    } else if (currentStep === 2) {
      if (!form.houseType) errs.houseType = "Please select a house type";
      if (!form.plan) errs.plan = "Please select a cleaning plan";

      const totalRooms =
        form.parlours +
        form.bedrooms +
        form.kitchens +
        form.bathrooms +
        form.officeSpaces +
        form.garages +
        form.stores;

      if (totalRooms === 0) errs.rooms = "Please add at least one room";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setTransitioning(true);
      setStep((prev) => Math.min(prev + 1, 3));
      setTimeout(() => setTransitioning(false), 500);
    }
  }

  function handleBack() {
    setTransitioning(true);
    setStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => setTransitioning(false), 500);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "plan" && value) {
      setShowPlanDetails(true);
    }
  }

  useEffect(() => {
    const totalRooms =
      form.parlours +
      form.bedrooms +
      form.kitchens +
      form.bathrooms +
      form.officeSpaces +
      form.garages +
      form.stores;

    const plan = form.plan;
    const house = form.houseType;
    const frequency = form.frequency;

    if (!plan || totalRooms === 0 || !house) {
      setEstimated(null);
      return;
    }

    const rates = PLAN_RATE[plan] || PLAN_RATE.Standard;
    const baseAmount = rates.first + (Math.max(0, totalRooms - 1) * rates.extra);
    const mult = HOUSE_MULTIPLIER[house] || 1;
    const discount = FREQUENCY_DISCOUNT[frequency] || 0;

    const extrasCost = Object.entries(form.extras).reduce((total, [key, selected]) => {
      return total + (selected ? (EXTRAS_PRICES[key] || 0) : 0);
    }, 0);

    const amount = Math.round(((baseAmount * mult) + extrasCost) * (1 - discount));
    setEstimated(amount);
  }, [
    form.plan,
    form.houseType,
    form.frequency,
    form.extras,
    form.parlours,
    form.bedrooms,
    form.kitchens,
    form.bathrooms,
    form.officeSpaces,
    form.garages,
    form.stores
  ]);

  const updateCount = (field, delta) => {
    setForm(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta)
    }));
  };

  const toggleExtra = (key) => {
    setForm(prev => ({
      ...prev,
      extras: {
        ...prev.extras,
        [key]: !prev.extras[key]
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

    // If not on the last step, try to move to the next step instead of submitting
    if (step < 3) {
      handleNext();
      return;
    }

    // Final validation before sending
    if (!validateStep(1) || !validateStep(2)) return;

    setSubmitting(true);
    const roomDetails = [
      form.parlours > 0 ? `${form.parlours} Parlour(s)` : null,
      form.bedrooms > 0 ? `${form.bedrooms} Bedroom(s)` : null,
      form.kitchens > 0 ? `${form.kitchens} Kitchen(s)` : null,
      form.bathrooms > 0 ? `${form.bathrooms} Bathroom(s)` : null,
      form.officeSpaces > 0 ? `${form.officeSpaces} Office Space(s)` : null,
      form.garages > 0 ? `${form.garages} Garage(s)` : null,
      form.stores > 0 ? `${form.stores} Store(s)` : null,
    ].filter(Boolean).join(", ");

    const selectedExtras = Object.entries(form.extras)
      .filter(([_, selected]) => selected)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim())
      .join(", ");

    const message = [
      "New quote request",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      form.address ? `Address: ${form.address}` : null,
      form.lga ? `LGA: ${form.lga}` : null,
      form.houseType ? `House type: ${form.houseType}` : null,
      roomDetails ? `Rooms: ${roomDetails}` : null,
      form.plan ? `Plan: ${form.plan}` : null,
      form.frequency ? `Frequency: ${form.frequency}` : null,
      selectedExtras ? `Extras: ${selectedExtras}` : null,
      form.cleaningSupplies ? "Includes Cleaning Supplies" : null,
      form.preferred ? `Preferred Date: ${form.preferred}` : null,
      form.specialRequests ? `Special Requests: ${form.specialRequests}` : null,
      estimated ? `Estimated Price: ₦${estimated.toLocaleString()}` : null,
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
          className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] transition-all duration-300 transform ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Request a Quote</h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">Step {step} of 3</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-50 h-1.5">
            <div
              className="bg-teal-500 h-1.5 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="overflow-y-auto p-6 custom-scrollbar">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4">
                {/* STEP 1: CONTACT INFO */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Full Name</span>
                      <input
                        ref={firstInput}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        placeholder="Your Name"
                      />
                      {errors.name && <div className="text-xs text-red-600 mt-1 ml-1">{errors.name}</div>}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Phone Number</span>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        placeholder="+234..."
                      />
                      {errors.phone && <div className="text-xs text-red-600 mt-1 ml-1">{errors.phone}</div>}
                    </label>

                    <label className="block md:col-span-2">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</span>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        placeholder="you@example.com"
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">LGA</span>
                      <select
                        name="lga"
                        value={form.lga}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                      >
                        <option value="">Select LGA</option>
                        {LAGOS_LGAS.map((lga) => (
                          <option key={lga} value={lga}>{lga}</option>
                        ))}
                      </select>
                      {errors.lga && <div className="text-xs text-red-600 mt-1 ml-1">{errors.lga}</div>}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Address</span>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        placeholder="Street address"
                      />
                      {errors.address && <div className="text-xs text-red-600 mt-1 ml-1">{errors.address}</div>}
                    </label>
                  </div>
                )}

                {/* STEP 2: SERVICE DETAILS */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">House Type</span>
                        <select
                          name="houseType"
                          value={form.houseType}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        >
                          <option value="">Select type</option>
                          <option value="Studio">Studio</option>
                          <option value="Flat">Flat</option>
                          <option value="Condo">Condo</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Duplex">Duplex</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.houseType && <div className="text-xs text-red-600 mt-1 ml-1">{errors.houseType}</div>}
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Frequency</span>
                        <select
                          name="frequency"
                          value={form.frequency}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        >
                          <option value="">Select frequency</option>
                          <option value="One-off">One-off (Standard Price)</option>
                          <option value="Bi-monthly">Bi-monthly (5% Off)</option>
                          <option value="Weekly">Once a week (10% Off)</option>
                          <option value="Twice a week">Twice a week (15% Off)</option>
                          <option value="3 times a week">3 times a week (20% Off)</option>
                          <option value="Everyday">Everyday (25% Off)</option>
                          <option value="Recurring">Other Recurring</option>
                        </select>
                      </label>
                    </div>

                    <div className="block">
                      <label className="block mb-2">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Cleaning plan</span>
                        <select
                          name="plan"
                          value={form.plan}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        >
                          <option value="">Select plan</option>
                          <option value="Basic">Basic</option>
                          <option value="Standard">Standard</option>
                          <option value="Premium">Premium</option>
                        </select>
                        {errors.plan && <div className="text-xs text-red-600 mt-1 ml-1">{errors.plan}</div>}
                      </label>

                      <button
                        type="button"
                        onClick={() => setShowPlanDetails(!showPlanDetails)}
                        className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 focus:outline-none mb-2"
                      >
                        {showPlanDetails ? "Hide plan details" : "What's included?"}
                        <svg className={`w-3 h-3 transition-transform ${showPlanDetails ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showPlanDetails ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                        <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                          <p className="text-xs font-semibold text-teal-800 mb-1">{form.plan || "Select a"} Plan Includes:</p>
                          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                            {(PLAN_DETAILS[form.plan] || PLAN_DETAILS.Basic).map((feature, idx) => (
                              <li key={idx} className="text-[10px] text-teal-700 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-teal-500 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700">Add Rooms</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {ROOM_CONFIG.map(({ label, key, icon }) => {
                            const count = form[key];
                            const isActive = count > 0;
                            return (
                              <div
                                key={key}
                                className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200 ${isActive
                                  ? "border-teal-500 bg-teal-50 shadow-sm"
                                  : "border-gray-200 bg-white hover:border-teal-200"
                                  }`}
                              >
                                <div className={`w-8 h-8 mb-2 rounded-full flex items-center justify-center ${isActive ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-400"
                                  }`}>
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={icon} />
                                  </svg>
                                </div>
                                <span className={`text-xs font-medium mb-2 ${isActive ? "text-teal-900" : "text-gray-600"}`}>
                                  {label}
                                </span>

                                <div className="flex items-center gap-3 w-full justify-center">
                                  <button
                                    type="button"
                                    onClick={() => updateCount(key, -1)}
                                    disabled={count === 0}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all active:scale-95 ${count === 0
                                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                                      }`}
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                  </button>

                                  <span className={`w-6 text-center font-bold text-lg ${isActive ? "text-teal-700" : "text-gray-300"}`}>
                                    {count}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => updateCount(key, 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white shadow-md hover:bg-teal-700 hover:shadow-lg transition-all active:scale-95"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {errors.rooms && <div className="text-xs text-red-600 mt-2 ml-1">{errors.rooms}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: EXTRAS & REVIEW */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Review Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">Review Your Details</h4>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-xs text-gray-500">Contact</span>
                          <span className="block font-medium text-gray-900">{form.name}</span>
                          <span className="block text-gray-600 text-xs">{form.phone}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">Location</span>
                          <span className="block font-medium text-gray-900">{form.lga}</span>
                          <span className="block text-gray-600 text-xs truncate">{form.address}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">Service</span>
                          <span className="block font-medium text-gray-900">{form.houseType} • {form.plan}</span>
                          <span className="block text-gray-600 text-xs">{form.frequency}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">Rooms</span>
                          <span className="block font-medium text-gray-900">
                            {[
                              form.parlours > 0 ? `${form.parlours} Parlour` : null,
                              form.bedrooms > 0 ? `${form.bedrooms} Bed` : null,
                              form.kitchens > 0 ? `${form.kitchens} Kitchen` : null,
                              form.bathrooms > 0 ? `${form.bathrooms} Bath` : null,
                            ].filter(Boolean).join(", ") || "None selected"}
                            {(form.officeSpaces > 0 || form.garages > 0 || form.stores > 0) && "..."}
                          </span>
                        </div>
                      </div>

                      {/* Total Price in Summary */}
                      <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700">Total Estimate</span>
                        <span className="text-lg font-bold text-teal-700">
                          {estimated
                            ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(estimated)
                            : "₦0"}
                        </span>
                      </div>
                    </div>

                    <div className="block relative" ref={extrasRef}>
                      <span className="block text-sm font-medium text-gray-700 mb-1">Extra Services</span>
                      <button
                        type="button"
                        onClick={() => setExtrasOpen(!extrasOpen)}
                        className="w-full text-left rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white flex items-center justify-between hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <span className="text-gray-700 truncate">
                          {Object.entries(form.extras).filter(([_, v]) => v).length > 0
                            ? `${Object.entries(form.extras).filter(([_, v]) => v).length} selected`
                            : "Select extras..."}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div className={`absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto focus:outline-none py-1 transition-all duration-200 origin-top transform ${extrasOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                        {[
                          { label: "Balcony (₦1,000)", key: "balcony" },
                          { label: "Wardrobe (₦1,000)", key: "wardrobe" },
                          { label: "Fridge (₦1,500)", key: "fridge" },
                          { label: "Fan (₦500)", key: "fan" },
                          { label: "Oven (₦1,500)", key: "oven" },
                          { label: "Laundry (₦4,000)", key: "laundry" },
                          { label: "Ironing (₦2,500)", key: "ironing" },
                          { label: "Kitchen Cabinet (₦1,500)", key: "kitchenCabinet" },
                          { label: "Compound (₦3,000)", key: "compound" },
                          { label: "Car Washing (₦2,000)", key: "carWashing" },
                        ].map(({ label, key }) => (
                          <div key={key} className="relative flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => toggleExtra(key)}>
                            <div className="flex h-5 items-center">
                              <input type="checkbox" checked={form.extras[key]} onChange={() => { }} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                            </div>
                            <div className="ml-3 text-sm"><label className="font-medium text-gray-700 cursor-pointer">{label}</label></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        name="cleaningSupplies"
                        checked={form.cleaningSupplies}
                        onChange={(e) => setForm({ ...form, cleaningSupplies: e.target.checked })}
                        className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Include Cleaning Supplies?</span>
                    </label>

                    <div className="grid grid-cols-1 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Preferred Date/Time</span>
                        <input
                          type="datetime-local"
                          name="preferred"
                          value={form.preferred}
                          onChange={handleChange}
                          min={minDateTime}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Special requests (optional)</span>
                        <textarea
                          name="specialRequests"
                          value={form.specialRequests}
                          onChange={handleChange}
                          rows={2}
                          className="w-full rounded-lg border-gray-300 focus:border-teal-500 focus:ring-teal-500 shadow-sm px-4 py-2.5"
                          placeholder="Any specific instructions..."
                        />
                      </label>
                    </div>

                    {/* price estimate */}
                    <div className="mt-2">
                      {estimated ? (
                        <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50 border border-teal-100">
                          <div>
                            <div className="text-sm font-medium text-teal-800">Estimated Price</div>
                            <div className="text-xs text-teal-600 mt-0.5">Based on selections</div>
                          </div>
                          <div className="text-2xl font-bold text-teal-700">
                            {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(estimated)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 text-center py-2 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                          Complete previous steps to see estimate.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* NAVIGATION BUTTONS */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={transitioning}
                      className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={transitioning}
                      className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg hover:shadow-teal-600/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg hover:shadow-teal-600/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={submitting || transitioning}
                    >
                      {submitting ? "Sending..." : "Send to WhatsApp"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Request Sent!</h4>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                  We've opened WhatsApp with your quote details. Hit send to start the conversation.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    onClick={() => {
                      setSubmitted(false);
                      setOpen(false);
                      setStep(1);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        lga: "",
                        houseType: "",
                        parlours: 0,
                        bedrooms: 0,
                        kitchens: 0,
                        bathrooms: 0,
                        officeSpaces: 0,
                        garages: 0,
                        stores: 0,
                        extras: {
                          balcony: false,
                          wardrobe: false,
                          fridge: false,
                          fan: false,
                          oven: false,
                          laundry: false,
                          ironing: false,
                          kitchenCabinet: false,
                          compound: false,
                          carWashing: false,
                        },
                        cleaningSupplies: false,
                        specialRequests: "",
                        plan: "",
                        frequency: "",
                        preferred: "",
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
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-md z-60">
          {toast}
        </div>
      )}
    </>
  );
}
