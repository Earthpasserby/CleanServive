import React, { useEffect, useRef, useState } from "react";

// Business WhatsApp number (international format, digits only)
// Provided by user: +234 (7067)87-6791 -> digits-only: 2347067876791
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
  "Weekly": 0.1,
  "Twice a week": 0.15,
  "3 times a week": 0.2,
  "Everyday": 0.25,
  "Recurring": 0,
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
    // Room counts
    parlours: 0,
    bedrooms: 0,
    kitchens: 0,
    bathrooms: 0,
    officeSpaces: 0,
    garages: 0,
    stores: 0,
    // Options
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
  const firstInput = useRef(null);
  const extrasRef = useRef(null);

  // close extras dropdown when clicking outside
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

  // smallest allowed preferred datetime is now (local)
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

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.phone.trim()) errs.phone = "Please enter a contact phone";
    if (!form.houseType) errs.houseType = "Please select a house type";

    const totalRooms =
      form.parlours +
      form.bedrooms +
      form.kitchens +
      form.bathrooms +
      form.officeSpaces +
      form.garages +
      form.stores;

    if (totalRooms === 0) errs.rooms = "Please add at least one room";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // compute estimated price whenever relevant inputs change
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
    // Formula: (FirstRoomRate + (AdditionalRooms * ExtraRate)) * HouseMultiplier
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

  // Helper to update room counts
  const updateCount = (field, delta) => {
    setForm(prev => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta)
    }));
  };

  // Helper to toggle extras
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
    // open in new tab
    window.open(url, "_blank");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
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
      selectedExtras ? `Extras: ${selectedExtras}` : null,
      form.cleaningSupplies ? "Include Cleaning Supplies: Yes" : "Include Cleaning Supplies: No",
      form.plan ? `Plan: ${form.plan}` : null,
      form.frequency ? `Frequency: ${form.frequency}` : null,
      estimated
        ? `Estimated price: ${new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0,
        }).format(estimated)}`
        : null,
      form.specialRequests ? `Special requests: ${form.specialRequests}` : null,
      form.preferred ? `Preferred: ${form.preferred}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // send and then show success state
    setTimeout(() => {
      try {
        sendToWhatsApp(message);
        // show toast indicating WhatsApp was opened
        setToast("Opened WhatsApp");
        setTimeout(() => setToast(""), 3000);
        setSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    }, 300);
  }

  // if (!open) return null; // Removed to allow exit animations

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] transition-all duration-300 transform ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b shrink-0">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Request a Quote</h3>
              <p className="text-sm text-gray-500 mt-1">Tell us about your cleaning needs</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto p-6">

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Full name</span>
                    <input
                      ref={firstInput}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      placeholder="Jane Doe"
                    />
                    {errors.name && (
                      <div className="text-xs text-red-600 mt-1 ml-1">
                        {errors.name}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Phone</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      placeholder="+2348012345678"
                    />
                    {errors.phone && (
                      <div className="text-xs text-red-600 mt-1 ml-1">
                        {errors.phone}
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      Email (optional)
                    </span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </span>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      placeholder="House, street, city"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">
                      LGA
                    </span>
                    <select
                      name="lga"
                      value={form.lga}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5 bg-white"
                    >
                      <option value="">Select LGA</option>
                      {LAGOS_LGAS.map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="border-t border-gray-100 my-2 pt-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Property Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        House type
                      </span>
                      <select
                        name="houseType"
                        value={form.houseType}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      >
                        <option value="">Select type</option>
                        <option value="Flat">Flat</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Condo">Condo</option>
                        <option value="Studio">Studio</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.houseType && (
                        <div className="text-xs text-red-600 mt-1 ml-1">
                          {errors.houseType}
                        </div>
                      )}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Cleaning plan
                      </span>
                      <select
                        name="plan"
                        value={form.plan}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      >
                        <option value="">Select plan</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </label>

                    <label className="block md:col-span-2">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency
                      </span>
                      <select
                        name="frequency"
                        value={form.frequency}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
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
                </div>

                <div className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-3">Room Breakdown</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      { label: "Parlour", key: "parlours" },
                      { label: "Bedroom", key: "bedrooms" },
                      { label: "Kitchen", key: "kitchens" },
                      { label: "Bathroom", key: "bathrooms" },
                      { label: "Office", key: "officeSpaces" },
                      { label: "Garage", key: "garages" },
                      { label: "Store", key: "stores" },
                    ].map(({ label, key }) => (
                      <div key={key} className="flex flex-col items-center p-3 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <span className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">{label}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount(key, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-gray-600 transition-all active:scale-95"
                          >
                            -
                          </button>
                          <span className="w-4 text-center font-bold text-lg text-gray-900">{form[key]}</span>
                          <button
                            type="button"
                            onClick={() => updateCount(key, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-green-600 transition-all active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.rooms && (
                    <div className="text-xs text-red-600 mt-2 ml-1">
                      {errors.rooms}
                    </div>
                  )}
                </div>

                <div className="block relative" ref={extrasRef}>
                  <span className="block text-sm font-medium text-gray-700 mb-1">Extra Services</span>
                  <button
                    type="button"
                    onClick={() => setExtrasOpen(!extrasOpen)}
                    className="w-full text-left rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm focus:border-green-500 focus:ring-green-500 flex items-center justify-between"
                  >
                    <span className="block truncate text-gray-700">
                      {Object.values(form.extras).filter(Boolean).length > 0
                        ? `${Object.values(form.extras).filter(Boolean).length} Selected`
                        : "Select extra services"}
                    </span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform ${extrasOpen ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto focus:outline-none py-1 transition-all duration-200 origin-top transform ${extrasOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                  >
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
                      <div
                        key={key}
                        className="relative flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                        onClick={() => toggleExtra(key)}
                      >
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            checked={form.extras[key]}
                            onChange={() => { }} // handled by parent div click
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="font-medium text-gray-700 cursor-pointer">
                            {label}
                          </label>
                        </div>
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
                    className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Include Cleaning Supplies?</span>
                </label>

                {/* price estimate */}
                <div className="mt-2">
                  {estimated ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100">
                      <div>
                        <div className="text-sm font-medium text-green-800">Estimated Price</div>
                        <div className="text-xs text-green-600 mt-0.5">
                          Based on {form.houseType}, {form.plan} plan & {form.frequency || 'One-off'}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          maximumFractionDigits: 0,
                        }).format(estimated)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-2 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      Select house type, rooms and plan to see an estimate.
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 my-2 pt-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Additional Info</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Special requests (optional)
                      </span>
                      <textarea
                        name="specialRequests"
                        value={form.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                        placeholder="Any special instructions, e.g., pet areas, staircases, delicate surfaces..."
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred date & time (optional)
                      </span>
                      <input
                        type="datetime-local"
                        name="preferred"
                        value={form.preferred}
                        onChange={handleChange}
                        min={minDateTime}
                        className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500 shadow-sm px-4 py-2.5"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send to WhatsApp"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Request Sent!</h4>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                  We've opened WhatsApp with your message. We'll get back to you shortly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-all"
                    onClick={() => {
                      // reset form and keep modal open for another submission
                      setSubmitted(false);
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
                      // focus first input after DOM update
                      setTimeout(
                        () => firstInput.current && firstInput.current.focus(),
                        50
                      );
                    }}
                  >
                    Send Another
                  </button>

                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    onClick={() => {
                      // reset and close
                      setSubmitted(false);
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
                      setOpen(false);
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
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-md z-60">
          {toast}
        </div>
      )}
    </>
  );
}
