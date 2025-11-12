import React, { useEffect, useRef, useState } from "react";

// Business WhatsApp number (international format, digits only)
// Provided by user: +234 (7067)87-6791 -> digits-only: 2347067876791
const WHATSAPP_NUMBER = "2347067876791";
// Pricing maps kept at module scope so effects don't need them as deps
const PLAN_RATE = {
  Basic: 1200, // per room
  Standard: 2000,
  Premium: 3500,
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
    houseType: "",
    rooms: "",
    specialRequests: "",
    plan: "",
    preferred: "",
  });
  const [estimated, setEstimated] = useState(null);
  const [errors, setErrors] = useState({});
  const firstInput = useRef(null);

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
    if (!form.rooms) errs.rooms = "Please select number of rooms";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // compute estimated price whenever relevant inputs change
  useEffect(() => {
    const rooms = parseInt(form.rooms, 10);
    const plan = form.plan;
    const house = form.houseType;
    if (!plan || !rooms || !house) {
      setEstimated(null);
      return;
    }
    const base = PLAN_RATE[plan] || PLAN_RATE.Standard;
    const mult = HOUSE_MULTIPLIER[house] || 1;
    const amount = Math.round(base * rooms * mult);
    setEstimated(amount);
  }, [form.plan, form.rooms, form.houseType]);

  // auto-select rooms for certain house types (e.g. Studio -> 1)
  useEffect(() => {
    if (form.houseType === "Studio" && !form.rooms) {
      setForm((f) => ({ ...f, rooms: "1" }));
    }
  }, [form.houseType, form.rooms]);

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
    const message = [
      "New quote request",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      form.address ? `Address: ${form.address}` : null,
      form.houseType ? `House type: ${form.houseType}` : null,
      form.rooms ? `Rooms: ${form.rooms}` : null,
      form.plan ? `Plan: ${form.plan}` : null,
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

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        <div className="relative w-full max-w-lg mx-4">
          <div className="card-box p-6 rounded-lg shadow-lg bg-white">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Request a Quote</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-muted"
              >
                ✕
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
                <label className="block">
                  <span className="block text-sm font-medium">Full name</span>
                  <input
                    ref={firstInput}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <div className="text-xs text-red-600 mt-1">
                      {errors.name}
                    </div>
                  )}
                </label>

                <label className="block">
                  <span className="block text-sm font-medium">Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="+2348012345678"
                  />
                  {errors.phone && (
                    <div className="text-xs text-red-600 mt-1">
                      {errors.phone}
                    </div>
                  )}
                </label>

                <label className="block">
                  <span className="block text-sm font-medium">
                    Email (optional)
                  </span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium">
                    Address (optional)
                  </span>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="House, street, city"
                  />
                </label>

                <div className="block">
                  <span className="block text-sm font-medium">
                    Describe the house(s) to be cleaned
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="block">
                      <span className="block text-sm font-medium">
                        House type
                      </span>
                      <select
                        name="houseType"
                        value={form.houseType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select type</option>
                        <option value="Flat">Flat</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Studio">Studio</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.houseType && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.houseType}
                        </div>
                      )}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium">Rooms</span>
                      <select
                        name="rooms"
                        value={form.rooms}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "room" : "rooms"}
                            </option>
                          )
                        )}
                      </select>
                      {errors.rooms && (
                        <div className="text-xs text-red-600 mt-1">
                          {errors.rooms}
                        </div>
                      )}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium">
                        Cleaning plan
                      </span>
                      <select
                        name="plan"
                        value={form.plan}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Select plan</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </label>
                  </div>
                </div>
                {/* price estimate */}
                <div className="mt-2">
                  {estimated ? (
                    <div className="text-sm p-3 rounded-md bg-gray-50 border">
                      <div className="font-medium">Estimated price</div>
                      <div className="text-lg font-semibold mt-1">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          maximumFractionDigits: 0,
                        }).format(estimated)}
                      </div>
                      <div className="text-xs text-muted mt-1">
                        Based on selected plan, house type and number of rooms.
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted">
                      Select house type, rooms and plan to see an estimate.
                    </div>
                  )}
                </div>
                <label className="block">
                  <span className="block text-sm font-medium">
                    Special requests (optional)
                  </span>
                  <textarea
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                    placeholder="Any special instructions, e.g., pet areas, staircases, delicate surfaces..."
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-medium">
                    Preferred date & time (optional)
                  </span>
                  <input
                    type="datetime-local"
                    name="preferred"
                    value={form.preferred}
                    onChange={handleChange}
                    min={minDateTime}
                    className="mt-1 block w-full rounded-md border px-3 py-2"
                  />
                  <div className="text-xs text-muted mt-1">
                    Optional — pick a preferred date and time
                  </div>
                </label>

                <div className="mt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send to WhatsApp"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 text-center">
                <div className="text-3xl text-green-600">✓</div>
                <h4 className="mt-3 text-lg font-semibold">Request sent</h4>
                <p className="text-muted mt-2">
                  We've opened WhatsApp with your message. We'll get back to you
                  soon.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      // reset form and keep modal open for another submission
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        houseType: "",
                        rooms: "",
                        specialRequests: "",
                        plan: "",
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
                    Send another
                  </button>

                  <button
                    type="button"
                    className="btn-accent"
                    onClick={() => {
                      // reset and close
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        houseType: "",
                        rooms: "",
                        specialRequests: "",
                        plan: "",
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
