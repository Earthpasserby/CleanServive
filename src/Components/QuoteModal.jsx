import React, { useEffect, useRef, useState } from "react";
import { usePaystackPayment } from "react-paystack";

// Business WhatsApp number
const WHATSAPP_NUMBER = "2347067876791";

const INSPECTION_FEE = 10000;

// Pricing maps
// Pricing maps
// Pricing maps
const PLAN_ROOM_PRICES = {
  Basic: {
    bedrooms: 4000,
    parlours: 4000,
    bathrooms: 2000,
    kitchens: 3000,
    stores: 2000,
    garages: 2000,
    officeSpaces: 2000,
  },
  Standard: {
    bedrooms: 5000,
    parlours: 6000,
    bathrooms: 2500,
    kitchens: 5000,
    stores: 3000,
    garages: 3000,
    officeSpaces: 3000,
  },
  Premium: {
    bedrooms: 8000,
    parlours: 7000,
    bathrooms: 3000,
    kitchens: 7000,
    stores: 5000,
    garages: 5000,
    officeSpaces: 5000,
  },
};

const PLAN_RATE = {
  Basic: { first: 4000 },
  Standard: { first: 7500 },
  Premium: { first: 12000 },
};

const STUDIO_PLAN_PRICE = {
  Basic: 30000,
  Standard: 50000,
  Premium: 70000,
};

const FREQUENCY_DISCOUNT = {
  "One-off": 0,
  "Bi-monthly": 0,
  Weekly: 0,
  "Twice a week": 0.15,
  "3 times a week": 0.2,
  Everyday: 0.25,
  Recurring: 0.1,
};

const FREQUENCY_DETAILS = {
  "One-off": { label: "", multiplier: 1, monthlyFactor: 0 },
  "Bi-monthly": { label: "(Monthly)", multiplier: 2, monthlyFactor: 1 },
  Weekly: { label: "(Weekly)", multiplier: 1, monthlyFactor: 4 },
  "Twice a week": { label: "(Weekly)", multiplier: 2, monthlyFactor: 4 },
  "3 times a week": { label: "(Weekly)", multiplier: 3, monthlyFactor: 4 },
  Everyday: { label: "(Daily)", multiplier: 1, monthlyFactor: 30 },
  Recurring: { label: "(Per Visit)", multiplier: 1, monthlyFactor: 4 },
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
  balcony: 2000,
  wardrobe: 3000,
  fridge: 2000,
  fan: 500,
  oven: 1500,
  laundry: 4000,
  ironing: 2500,
  kitchenCabinet: 1500,
  compound: 5000,
  carWashing: 5000,
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

const ISLAND_LGAS = ["Apapa", "Eti-Osa", "Epe", "Ibeju-Lekki", "Lagos Island"];

const ROOM_CONFIG = [
  {
    label: "Parlour",
    key: "parlours",
    icon: "M19 10h2a1 1 0 0 1 0 2h-1v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6H3a1 1 0 0 1 0-2h2v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1z",
  }, // Sofa
  {
    label: "Bedroom",
    key: "bedrooms",
    icon: "M2 10h20v7h-2v-3H4v3H2v-7zm2-4h7v3H4V6zm9 0h7v3h-7V6z",
  }, // Bed
  {
    label: "Kitchen",
    key: "kitchens",
    icon: "M4 20h16v-8H4v8zm2-6h12v4H6v-4zm6-12v8h-2V2h2zm-4 0v8H6V2h2zm8 0v8h-2V2h2z",
  }, // Utensils (Abstract)
  {
    label: "Bathroom",
    key: "bathrooms",
    icon: "M4 12v8h16v-8H4zm2 2h2v4H6v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z M12 2L4 10h16L12 2z",
  }, // House/Bath
  {
    label: "Office",
    key: "officeSpaces",
    icon: "M4 6h16v12H4V6zm2 2v8h12V8H6zm-2-4h16v2H4V4z",
  }, // Briefcase
  {
    label: "Garage",
    key: "garages",
    icon: "M19 13v6H5v-6H3v8h2v-2h14v2h2v-8h-2z M12 3L3 11h18L12 3z",
  }, // Garage
  { label: "Store", key: "stores", icon: "M4 4h16v16H4V4zm2 2v12h12V6H6z" }, // Box
];

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");
  const [serviceType, setServiceType] = useState("regular"); // regular, post-construction, move-in-out
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
    debrisDescription: "", // New field for debris details
  });
  const [estimated, setEstimated] = useState(null);
  const [errors, setErrors] = useState({});
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const firstInput = useRef(null);
  const extrasRef = useRef(null);
  const isStudio = serviceType === "regular" && form.houseType === "Studio";

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
      if (!form.phone.trim()) {
        errs.phone = "Please enter a contact phone";
      } else if (form.phone.replace(/[^0-9]/g, "").length < 10) {
        errs.phone = "Please enter a valid phone number";
      }
      if (!form.address.trim()) errs.address = "Please enter your address";
      if (!form.lga) errs.lga = "Please select an LGA";
    } else if (currentStep === 2) {
      if (!form.houseType) errs.houseType = "Please select a house type";

      // Validation changes for different service types
      if (serviceType === "regular") {
        if (!form.plan) errs.plan = "Please select a cleaning plan";
      }

      if (serviceType !== "regular" && !form.debrisDescription.trim()) {
        errs.debrisDescription = "Please describe the debris/items to be moved";
      }

      const totalRooms =
        form.parlours +
        form.bedrooms +
        form.kitchens +
        form.bathrooms +
        form.officeSpaces +
        form.garages +
        form.stores;

      if (totalRooms === 0 && !isStudio) {
        errs.rooms = "Please add at least one room";
      }
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
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "houseType" && value === "Studio") {
        next.parlours = 0;
        next.bedrooms = 0;
        next.kitchens = 0;
        next.bathrooms = 0;
        next.officeSpaces = 0;
        next.garages = 0;
        next.stores = 0;
      }
      return next;
    });

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

    if (!house) {
      setEstimated(null);
      return;
    }

    // Special logic for Non-Regular Services
    if (serviceType !== "regular") {
      if (totalRooms === 0) {
        setEstimated(null);
        return;
      }
      const isIsland = ISLAND_LGAS.includes(form.lga);
      const transportationFee = isIsland ? 4000 : 3000;
      const base = INSPECTION_FEE;
      const vat = (base + transportationFee) * 0.075;
      setEstimated(Math.round(base + transportationFee + vat));
      return;
    }

    if (!plan) {
      // Plan is required for regular cleaning calculation
      setEstimated(null);
      return;
    }

    const roomPrices = PLAN_ROOM_PRICES[plan] || PLAN_ROOM_PRICES.Standard;

    // Calculate total value of all selected rooms based on plan-specific prices
    let totalRoomValue = 0;
    if (isStudio) {
      totalRoomValue = STUDIO_PLAN_PRICE[plan] || 0;
    } else {
      if (totalRooms === 0) {
        setEstimated(null);
        return;
      }
      Object.entries(roomPrices).forEach(([key, price]) => {
        totalRoomValue += (form[key] || 0) * price;
      });
    }

    // Base amount is the total value of all selected rooms
    let baseAmount = totalRoomValue;
    // const mult = HOUSE_MULTIPLIER[house] || 1; // Removed as per user request
    const discount = FREQUENCY_DISCOUNT[frequency] || 0;
    const extrasCost = Object.entries(form.extras).reduce(
      (total, [key, selected]) => {
        return total + (selected ? EXTRAS_PRICES[key] || 0 : 0);
      },
      0,
    );

    // Transportation Fee
    const isIsland = ISLAND_LGAS.includes(form.lga);
    const transportationFee = isIsland ? 4000 : 3000;

    const basePlanCost = baseAmount; // No longer multiplying by house type
    let amount = basePlanCost;

    // Apply discount to the final total (Base)
    amount = Math.round(amount * (1 - discount));

    // Add extras cost (Not discounted)
    amount += extrasCost;

    // Add transportation fee
    amount += transportationFee;

    // Calculate VAT (7.5%)
    const vat = amount * 0.075;
    amount += vat;

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
    form.stores,
    form.lga,
    serviceType, // Added serviceType dependency
  ]);

  const updateCount = (field, delta) => {
    setForm((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const toggleExtra = (key) => {
    setForm((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [key]: !prev.extras[key],
      },
    }));
  };

  function sendToWhatsApp(message) {
    const digits = (WHATSAPP_NUMBER || "").replace(/\D/g, "");
    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  // Placeholder for Google Apps Script Web App URL
  // TODO: Replace this with your actual deployed Web App URL
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzJ-yhUYqQ94zdh7YQ6zdOwv0k9m-t1WxBFilel9e7MqBV-Qvu0ooviDvSHEFwu_gz9/exec";

  function submitToGoogleSheets(formData) {
    if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
      console.warn("Google Sheets URL not set. Skipping submission.");
      return;
    }

    // Convert to URL parameters (application/x-www-form-urlencoded)
    // This is much more reliable for Google Apps Script than JSON
    const params = new URLSearchParams();
    params.append("timestamp", new Date().toISOString());
    params.append("serviceType", serviceType); // Added serviceType
    params.append("name", formData.name);
    params.append("phone", formData.phone);
    params.append("email", formData.email);
    params.append("lga", formData.lga);
    params.append("address", formData.address);
    params.append("houseType", formData.houseType);
    params.append("plan", formData.plan || "N/A"); // Handle missing plan
    params.append("frequency", formData.frequency || "One-off");
    params.append(
      "price",
      estimated
        ? estimated * (FREQUENCY_DETAILS[formData.frequency]?.multiplier || 1)
        : 0,
    );

    const roomsLabel =
      serviceType === "regular" && formData.houseType === "Studio"
        ? "Studio"
        : `${formData.parlours}P, ${formData.bedrooms}B, ${formData.kitchens}K...`;
    let detailsString = `Rooms: ${roomsLabel} Extras: ${Object.entries(
      formData.extras,
    )
      .filter(([k, v]) => v)
      .map(([k]) => k)
      .join(",")}`;
    if (serviceType !== "regular") {
      detailsString += ` | Debris Description: ${formData.debrisDescription}`;
    }
    params.append("details", detailsString);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })
      .then(() => console.log("Submitted to Google Sheets"))
      .catch((err) => console.error("Error submitting to Google Sheets:", err));
  }

  // Paystack Configuration
  // TODO: Replace with your actual Paystack Public Key
  const PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_PUBLIC_KEY_HERE";

  // Calculate amount for paystack
  let paystackAmount = 0;
  if (estimated) {
    if (serviceType === "regular") {
      paystackAmount =
        estimated * (FREQUENCY_DETAILS[form.frequency]?.multiplier || 1) * 100;
    } else {
      paystackAmount = estimated * 100; // Fixed inspection fee
    }
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: form.email || "customer@example.com",
    amount: paystackAmount, // Amount in kobo
    publicKey: PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    // 1. Submit to Google Sheets
    submitToGoogleSheets(form);

    // 2. Construct WhatsApp Message
    const roomDetails =
      serviceType === "regular" && form.houseType === "Studio"
        ? "Studio"
        : [
            form.parlours > 0 ? `${form.parlours} Parlour(s)` : null,
            form.bedrooms > 0 ? `${form.bedrooms} Bedroom(s)` : null,
            form.kitchens > 0 ? `${form.kitchens} Kitchen(s)` : null,
            form.bathrooms > 0 ? `${form.bathrooms} Bathroom(s)` : null,
            form.officeSpaces > 0 ? `${form.officeSpaces} Office Space(s)` : null,
            form.garages > 0 ? `${form.garages} Garage(s)` : null,
            form.stores > 0 ? `${form.stores} Store(s)` : null,
          ]
            .filter(Boolean)
            .join(", ");

    const selectedExtras = Object.entries(form.extras)
      .filter(([_, selected]) => selected)
      .map(
        ([key]) =>
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim(),
      )
      .join(", ");

    const messageParts = [
      "New quote request (PAID)",
      `Payment Reference: ${reference.reference}`,
      `Service Type: ${serviceType === "regular" ? "Regular Cleaning" : serviceType === "post-construction" ? "Post-Construction Cleaning" : "Move-In/Out Cleaning"}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      form.address ? `Address: ${form.address}` : null,
      form.lga ? `LGA: ${form.lga}` : null,
      form.houseType ? `House type: ${form.houseType}` : null,
      roomDetails ? `Rooms: ${roomDetails}` : null,
    ];

    if (serviceType === "regular") {
      messageParts.push(form.plan ? `Plan: ${form.plan}` : null);
      messageParts.push(form.frequency ? `Frequency: ${form.frequency}` : null);
    } else {
      messageParts.push(`Debris/Items Details: ${form.debrisDescription}`);
      messageParts.push("NOTE: Customer paid Inspection Fee.");
    }

    messageParts.push(selectedExtras ? `Extras: ${selectedExtras}` : null);
    messageParts.push(
      form.cleaningSupplies ? "Request for cleaning supplies" : null,
    );
    messageParts.push(
      form.preferred ? `Preferred Date: ${form.preferred}` : null,
    );
    messageParts.push(
      form.specialRequests ? `Special Requests: ${form.specialRequests}` : null,
    );

    let amountDisplay = "";
    if (estimated) {
      if (serviceType === "regular") {
        amountDisplay = `Amount Paid: ₦${(estimated * (FREQUENCY_DETAILS[form.frequency]?.multiplier || 1)).toLocaleString()} ${FREQUENCY_DETAILS[form.frequency]?.label || ""}`;
      } else {
        amountDisplay = `Inspection Fee Paid: ₦${estimated.toLocaleString()}`;
      }
    }

    messageParts.push(amountDisplay);

    const message = messageParts.filter(Boolean).join("\n");

    setTimeout(() => {
      try {
        sendToWhatsApp(message);
        setToast("Payment Successful! Opening WhatsApp...");
        setTimeout(() => setToast(""), 3000);
        setSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    }, 300);
  };

  const onClose = () => {
    setSubmitting(false);
    setToast("Payment cancelled.");
    setTimeout(() => setToast(""), 3000);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    if (!validateStep(1) || !validateStep(2)) return;

    setSubmitting(true);

    // Trigger Paystack Payment FIRST
    initializePayment(onSuccess, onClose);
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] transition-all duration-300 transform ${
            open
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Request a Quote
              </h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Step {step} of 3
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-50 h-1.5">
            <div
              className="bg-sky-600 h-1.5 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(2,132,199,0.5)]"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="overflow-y-auto p-6 custom-scrollbar">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4">
                {/* STEP 1: CONTACT INFO */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* SERVICE TYPE SELECTION */}
                    <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                      <span className="block text-sm font-bold text-sky-800 mb-3 uppercase tracking-wide">
                        Select Service Type
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "regular", label: "Regular Cleaning" },
                          {
                            id: "post-construction",
                            label: "Post-Construction",
                          },
                          { id: "move-in-out", label: "Move In/Out" },
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setServiceType(type.id)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              serviceType === type.id
                                ? "bg-sky-600 text-white shadow-md scale-105"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-sky-300 hover:text-sky-600"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </span>
                        <input
                          ref={firstInput}
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="Your Name"
                        />
                        {errors.name && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.name}
                          </div>
                        )}
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </span>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="+234..."
                        />
                        {errors.phone && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.phone}
                          </div>
                        )}
                      </label>

                      <label className="block md:col-span-2">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address (Optional)
                        </span>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="scrubbpro@example.com"
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
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                        >
                          <option value="">Select LGA</option>
                          {LAGOS_LGAS.map((lga) => (
                            <option key={lga} value={lga}>
                              {lga}
                            </option>
                          ))}
                        </select>
                        {errors.lga && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.lga}
                          </div>
                        )}
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </span>
                        <input
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="Street address"
                        />
                        {errors.address && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.address}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 2: SERVICE DETAILS */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          House Type
                        </span>
                        <select
                          name="houseType"
                          value={form.houseType}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                        >
                          <option value="">Select type</option>
                          <option value="Studio">Studio(Selfcon)</option>
                          <option value="Flat">Flat</option>
                          <option value="ServicedApartment">
                            Serviced Apartment
                          </option>
                          <option value="Penthouse">Penthouse</option>
                          {/* <option value="Townhouse">Townhouse</option> */}
                          <option value="Duplex">Duplex</option>
                          {/* <option value="Bungalow">Bungalow</option> */}
                          <option value="Other">Other</option>
                        </select>
                        {errors.houseType && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.houseType}
                          </div>
                        )}
                      </label>

                      {serviceType === "regular" && (
                        <label className="block">
                          <span className="block text-sm font-medium text-gray-700 mb-1">
                            Frequency
                          </span>
                          <select
                            name="frequency"
                            value={form.frequency}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          >
                            <option value="">Select frequency</option>
                            <option value="One-off">One-off</option>
                            <option value="Bi-monthly">
                              Bi-monthly (5% Off)
                            </option>
                            <option value="Weekly">
                              Once a week (10% Off)
                            </option>
                            <option value="Twice a week">
                              Twice a week (15% Off)
                            </option>
                            <option value="3 times a week">
                              3 times a week (20% Off)
                            </option>
                            <option value="Everyday">Everyday (25% Off)</option>
                            <option value="Recurring">Other Recurring</option>
                          </select>
                        </label>
                      )}
                    </div>

                    {serviceType === "regular" && (
                      <div className="block">
                        <label className="block mb-2">
                          <span className="block text-sm font-medium text-gray-700 mb-1">
                            Cleaning plan
                          </span>
                          <select
                            name="plan"
                            value={form.plan}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          >
                            <option value="">Select plan</option>
                            <option value="Basic">Basic</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                          </select>
                          {errors.plan && (
                            <div className="text-xs text-red-600 mt-1 ml-1">
                              {errors.plan}
                            </div>
                          )}
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowPlanDetails(!showPlanDetails)}
                          className="text-xs font-medium text-sky-600 hover:text-sky-700 flex items-center gap-1 focus:outline-none mb-2"
                        >
                          {showPlanDetails
                            ? "Hide plan details"
                            : "What's included?"}
                          <svg
                            className={`w-3 h-3 transition-transform ${showPlanDetails ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${showPlanDetails ? "max-h-40 opacity-100 mb-4" : "max-h-0 opacity-0"}`}
                        >
                          <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
                            <p className="text-xs font-semibold text-sky-800 mb-1">
                              {form.plan || "Select a"} Plan Includes:
                            </p>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                              {(
                                PLAN_DETAILS[form.plan] || PLAN_DETAILS.Basic
                              ).map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="text-[10px] text-sky-700 flex items-center gap-1"
                                >
                                  <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {serviceType !== "regular" && (
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          {serviceType === "post-construction"
                            ? "Describe debris & work needed"
                            : "Items/Dirt to move out"}
                        </span>
                        <textarea
                          name="debrisDescription"
                          value={form.debrisDescription}
                          onChange={handleChange}
                          rows={3}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="Please list heavy items, debris type, or specific areas needing attention..."
                        />
                        {errors.debrisDescription && (
                          <div className="text-xs text-red-600 mt-1 ml-1">
                            {errors.debrisDescription}
                          </div>
                        )}
                      </label>
                    )}

                    <div className="space-y-4">
                      <p className="text-sm font-medium text-gray-700">
                        Add Rooms
                      </p>
                      {isStudio && (
                        <p className="text-xs text-slate-500">
                          Studio uses a fixed plan price. Room selection is
                          disabled.
                        </p>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {ROOM_CONFIG.map(({ label, key, icon }) => {
                          const count = form[key];
                          const isActive = count > 0;
                          return (
                            <div
                              key={key}
                              className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200 ${
                                isActive
                                  ? "border-sky-500 bg-sky-50 shadow-sm"
                                  : "border-gray-200 bg-white hover:border-sky-200"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 mb-2 rounded-full flex items-center justify-center ${
                                  isActive
                                    ? "bg-sky-100 text-sky-600"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d={icon} />
                                </svg>
                              </div>
                              <span
                                className={`text-xs font-medium mb-2 ${isActive ? "text-sky-900" : "text-gray-600"}`}
                              >
                                {label}
                              </span>

                              <div className="flex items-center gap-3 w-full justify-center">
                                <button
                                  type="button"
                                  onClick={() => updateCount(key, -1)}
                                  disabled={count === 0 || isStudio}
                                  className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all active:scale-95 ${
                                    count === 0 || isStudio
                                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                                  }`}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                <span
                                  className={`w-6 text-center font-bold text-lg ${isActive ? "text-sky-700" : "text-gray-300"}`}
                                >
                                  {count}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateCount(key, 1)}
                                  disabled={isStudio}
                                  className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all active:scale-95 ${
                                    isStudio
                                      ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                                      : "bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg"
                                  }`}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {errors.rooms && (
                        <div className="text-xs text-red-600 mt-2 ml-1">
                          {errors.rooms}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: EXTRAS & REVIEW */}
                {step === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Review Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
                        Review Your Details
                      </h4>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-xs text-gray-500">
                            Contact
                          </span>
                          <span className="block font-medium text-gray-900">
                            {form.name}
                          </span>
                          <span className="block text-gray-600 text-xs">
                            {form.phone}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">
                            Location
                          </span>
                          <span className="block font-medium text-gray-900">
                            {form.lga}
                          </span>
                          <span className="block text-gray-600 text-xs truncate">
                            {form.address}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">
                            Service
                          </span>
                          <span className="block font-medium text-gray-900">
                            {form.houseType} • {form.plan}
                          </span>
                          <span className="block text-gray-600 text-xs">
                            {form.frequency}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-500">
                            Rooms
                          </span>
                          <span className="block font-medium text-gray-900">
                            {isStudio
                              ? "Studio"
                              : [
                                  form.parlours > 0
                                    ? `${form.parlours} Parlour`
                                    : null,
                                  form.bedrooms > 0
                                    ? `${form.bedrooms} Bed`
                                    : null,
                                  form.kitchens > 0
                                    ? `${form.kitchens} Kitchen`
                                    : null,
                                  form.bathrooms > 0
                                    ? `${form.bathrooms} Bath`
                                    : null,
                                ]
                                  .filter(Boolean)
                                  .join(", ") || "None selected"}
                            {!isStudio &&
                              (form.officeSpaces > 0 ||
                                form.garages > 0 ||
                                form.stores > 0) &&
                              "..."}
                          </span>
                        </div>
                      </div>

                      {/* Total Price in Summary */}
                      <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700">
                          {serviceType === "regular"
                            ? `Total Estimate ${FREQUENCY_DETAILS[form.frequency]?.label ? FREQUENCY_DETAILS[form.frequency].label : ""}`
                            : "Inspection Fee"}
                        </span>
                        <span className="text-lg font-bold text-sky-700">
                          {estimated
                            ? new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                maximumFractionDigits: 0,
                              }).format(
                                serviceType === "regular"
                                  ? estimated *
                                      (FREQUENCY_DETAILS[form.frequency]
                                        ?.multiplier || 1)
                                  : estimated,
                              )
                            : "₦0"}
                        </span>
                      </div>

                      {/* Estimated Monthly Cost (Only for recurring plans) */}
                      {serviceType === "regular" &&
                        estimated &&
                        FREQUENCY_DETAILS[form.frequency]?.monthlyFactor >
                          0 && (
                          <div className="pt-2 border-t border-gray-100 mt-1 flex justify-between items-center">
                            <span className="text-xs font-medium text-gray-500">
                              Estimated Monthly Cost
                            </span>
                            <span className="text-sm font-bold text-gray-500">
                              {new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                maximumFractionDigits: 0,
                              }).format(
                                estimated *
                                  (FREQUENCY_DETAILS[form.frequency]
                                    ?.multiplier || 1) *
                                  (FREQUENCY_DETAILS[form.frequency]
                                    ?.monthlyFactor || 1),
                              )}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="block relative" ref={extrasRef}>
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Extra Services
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtrasOpen(!extrasOpen)}
                        className="w-full text-left rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white flex items-center justify-between hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <span className="text-gray-700 truncate">
                          {Object.entries(form.extras).filter(([_, v]) => v)
                            .length > 0
                            ? `${Object.entries(form.extras).filter(([_, v]) => v).length} selected`
                            : "Select extras..."}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <div
                        className={`absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto focus:outline-none py-1 transition-all duration-200 origin-top transform ${extrasOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                      >
                        {[
                          { label: "Balcony (₦2,000)", key: "balcony" },
                          { label: "Wardrobe (₦3,000)", key: "wardrobe" },
                          { label: "Fridge (₦2,000)", key: "fridge" },
                          { label: "Fan (₦500)", key: "fan" },
                          { label: "Oven (₦1,500)", key: "oven" },
                          { label: "Laundry (₦4,000)", key: "laundry" },
                          { label: "Ironing (₦2,500)", key: "ironing" },
                          {
                            label: "Kitchen Cabinet (₦1,500)",
                            key: "kitchenCabinet",
                          },
                          { label: "Compound (₦5,000)", key: "compound" },
                          { label: "Car Washing (₦5,000)", key: "carWashing" },
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
                                onChange={() => {}}
                                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
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
                        onChange={(e) =>
                          setForm({
                            ...form,
                            cleaningSupplies: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Request for cleaning supplies
                      </span>
                    </label>

                    <div className="grid grid-cols-1 gap-4">
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date/Time
                        </span>
                        <input
                          type="datetime-local"
                          name="preferred"
                          value={form.preferred}
                          onChange={handleChange}
                          min={minDateTime}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">
                          Special requests (optional)
                        </span>
                        <textarea
                          name="specialRequests"
                          value={form.specialRequests}
                          onChange={handleChange}
                          rows={2}
                          className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 shadow-sm px-4 py-2.5"
                          placeholder="Any specific instructions..."
                        />
                      </label>
                    </div>

                    {/* price estimate */}
                    <div className="mt-2">
                      {estimated ? (
                        <div className="bg-sky-50 rounded-xl border border-sky-100 overflow-hidden">
                          <div className="p-4 border-b border-sky-100">
                            <h4 className="font-bold text-sky-900 text-sm uppercase tracking-wider mb-3">
                              Price Breakdown
                              {form.plan ? ` • ${form.plan}` : ""}
                              {form.frequency ? ` • ${form.frequency}` : ""}
                            </h4>
                            <div className="space-y-2 text-sm">
                              {serviceType === "regular" ? (
                                <>
                                  {/* Calculate room cost for display */}
                                  {(() => {
                                    const roomPrices =
                                      PLAN_ROOM_PRICES[form.plan] ||
                                      PLAN_ROOM_PRICES.Standard;
                                    let totalRoomValue = 0;
                                    let totalRooms = 0;
                                    if (isStudio) {
                                      totalRoomValue =
                                        STUDIO_PLAN_PRICE[form.plan] || 0;
                                      return (
                                        <div className="flex justify-between text-sky-700">
                                          <span>Studio Plan</span>
                                          <span>
                                            {new Intl.NumberFormat("en-NG", {
                                              style: "currency",
                                              currency: "NGN",
                                              maximumFractionDigits: 0,
                                            }).format(totalRoomValue)}
                                          </span>
                                        </div>
                                      );
                                    }

                                    Object.entries(roomPrices).forEach(
                                      ([key, price]) => {
                                        const count = form[key] || 0;
                                        totalRoomValue += count * price;
                                        totalRooms += count;
                                      },
                                    );

                                    if (totalRooms > 0) {
                                      return (
                                        <div className="flex justify-between text-sky-700">
                                          <span>
                                            Room Add-ons ({totalRooms})
                                          </span>
                                          <span>
                                            {new Intl.NumberFormat("en-NG", {
                                              style: "currency",
                                              currency: "NGN",
                                              maximumFractionDigits: 0,
                                            }).format(totalRoomValue)}
                                          </span>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })()}

                                  {/* Extras */}
                                  {Object.entries(form.extras).map(
                                    ([key, selected]) => {
                                      if (!selected) return null;
                                      return (
                                        <div
                                          key={key}
                                          className="flex justify-between text-slate-600 text-xs"
                                        >
                                          <span>
                                            +{" "}
                                            {key.charAt(0).toUpperCase() +
                                              key
                                                .slice(1)
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                          </span>
                                          <span>
                                            {new Intl.NumberFormat("en-NG", {
                                              style: "currency",
                                              currency: "NGN",
                                              maximumFractionDigits: 0,
                                            }).format(EXTRAS_PRICES[key] || 0)}
                                          </span>
                                        </div>
                                      );
                                    },
                                  )}

                                  {/* Transportation Fee */}
                                  <div className="flex justify-between text-slate-600 text-xs">
                                    <span>
                                      + Transportation (
                                      {ISLAND_LGAS.includes(form.lga)
                                        ? "Island"
                                        : "Mainland"}
                                      )
                                    </span>
                                    <span>
                                      {new Intl.NumberFormat("en-NG", {
                                        style: "currency",
                                        currency: "NGN",
                                        maximumFractionDigits: 0,
                                      }).format(
                                        ISLAND_LGAS.includes(form.lga)
                                          ? 4000
                                          : 3000,
                                      )}
                                    </span>
                                  </div>

                                  {/* Discount */}

                                  {FREQUENCY_DISCOUNT[form.frequency] > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium pt-2 border-t border-sky-100/50">
                                      <span>
                                        Frequency Discount ({form.frequency})
                                      </span>
                                      <span>
                                        -
                                        {FREQUENCY_DISCOUNT[form.frequency] *
                                          100}
                                        %
                                      </span>
                                    </div>
                                  )}

                                  {/* Frequency Multiplier */}
                                  {(FREQUENCY_DETAILS[form.frequency]
                                    ?.multiplier || 1) > 1 && (
                                    <div className="flex justify-between text-sky-700 font-medium pt-2 border-t border-sky-100/50">
                                      <span>
                                        Frequency Multiplier (
                                        {
                                          FREQUENCY_DETAILS[form.frequency]
                                            ?.label
                                        }
                                        )
                                      </span>
                                      <span>
                                        x
                                        {
                                          FREQUENCY_DETAILS[form.frequency]
                                            ?.multiplier
                                        }
                                      </span>
                                    </div>
                                  )}

                                  {/* VAT Display */}
                                  <div className="flex justify-between text-gray-600 font-medium pt-2 border-t border-sky-100/50">
                                    <span>VAT (7.5%)</span>
                                    <span>
                                      {new Intl.NumberFormat("en-NG", {
                                        style: "currency",
                                        currency: "NGN",
                                        maximumFractionDigits: 0,
                                      }).format(
                                        (estimated / 1.075) *
                                          0.075 *
                                          (FREQUENCY_DETAILS[form.frequency]
                                            ?.multiplier || 1),
                                      )}
                                    </span>
                                  </div>

                                  {/* Weekly/Monthly Estimates */}
                                  {(() => {
                                    const details =
                                      FREQUENCY_DETAILS[form.frequency] || {};
                                    let weeklyEstimate = null;
                                    let monthlyEstimate = null;

                                    if (details.label === "(Weekly)") {
                                      weeklyEstimate =
                                        estimated * (details.multiplier || 1);
                                      monthlyEstimate = weeklyEstimate * 4;
                                    } else if (details.label === "(Daily)") {
                                      weeklyEstimate = estimated * 7;
                                      monthlyEstimate = estimated * 30;
                                    } else if (details.label === "(Monthly)") {
                                      monthlyEstimate =
                                        estimated * (details.multiplier || 1);
                                    }

                                    if (!weeklyEstimate && !monthlyEstimate) {
                                      return null;
                                    }

                                    return (
                                      <>
                                        {weeklyEstimate && (
                                          <div className="flex justify-between text-slate-600 text-xs">
                                            <span>Estimated Weekly</span>
                                            <span>
                                              {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                                maximumFractionDigits: 0,
                                              }).format(weeklyEstimate)}
                                            </span>
                                          </div>
                                        )}
                                        {monthlyEstimate && (
                                          <div className="flex justify-between text-slate-600 text-xs">
                                            <span>Estimated Monthly</span>
                                            <span>
                                              {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                                maximumFractionDigits: 0,
                                              }).format(monthlyEstimate)}
                                            </span>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
                                </>
                              ) : (
                                <>
                                  {/* Specialized Service Breakdown */}
                                  <div className="flex justify-between text-sky-800">
                                    <span>Inspection Fee</span>
                                    <span>
                                      {new Intl.NumberFormat("en-NG", {
                                        style: "currency",
                                        currency: "NGN",
                                        maximumFractionDigits: 0,
                                      }).format(INSPECTION_FEE)}
                                    </span>
                                  </div>

                                  <div className="flex justify-between text-slate-600 text-xs">
                                    <span>
                                      + Transportation (
                                      {ISLAND_LGAS.includes(form.lga)
                                        ? "Island"
                                        : "Mainland"}
                                      )
                                    </span>
                                    <span>
                                      {new Intl.NumberFormat("en-NG", {
                                        style: "currency",
                                        currency: "NGN",
                                        maximumFractionDigits: 0,
                                      }).format(
                                        ISLAND_LGAS.includes(form.lga)
                                          ? 4000
                                          : 3000,
                                      )}
                                    </span>
                                  </div>

                                  <div className="flex justify-between text-gray-600 font-medium pt-2 border-t border-sky-100/50">
                                    <span>VAT (7.5%)</span>
                                    <span>
                                      {new Intl.NumberFormat("en-NG", {
                                        style: "currency",
                                        currency: "NGN",
                                        maximumFractionDigits: 0,
                                      }).format(
                                        estimated - estimated / 1.075, // Calculate VAT from Total
                                      )}
                                    </span>
                                  </div>
                                </>
                              )}

                              {/* Monthly Estimate */}
                            </div>
                          </div>
                          <div className="p-4 bg-sky-100/50 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-bold text-sky-900">
                                Total Estimate{" "}
                                {FREQUENCY_DETAILS[form.frequency]?.label}
                              </div>
                              <div className="text-xs text-sky-600 mt-0.5">
                                Includes all fees
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-sky-700">
                              {new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                maximumFractionDigits: 0,
                              }).format(
                                estimated *
                                  (FREQUENCY_DETAILS[form.frequency]
                                    ?.multiplier || 1),
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                          Complete previous steps to see your price breakdown.
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
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-600/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-600/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={submitting || transitioning}
                    >
                      {submitting ? "Sending..." : "Send to WhatsApp"}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Request Sent!
                </h4>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                  We've opened WhatsApp with your quote details. Hit send to
                  start the conversation.
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
