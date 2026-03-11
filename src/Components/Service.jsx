const Service = () => {
  return (
    <>
      <div className="mx-auto  w-full px-4 sm:px-14 lg:px-14 pt-4 sm:pt-24  bg-white">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <h3 className="font-bold text-sky-700 md:text-3xl xl:text-3xl sm:text-2xl tracking-tight">
            Keep Your Hands Clean and Ours Dirty
          </h3>
          <p className="text-slate-500 font-medium pt-3 max-w-xl text-center text-lg">
            We deliver reliable, detail-focused cleaning for homes, offices, and events.
          </p>
          <button
            type="button"
            className="btn-primary mt-4"
            onClick={() => window.dispatchEvent(new CustomEvent("openQuoteModal"))}
          >
            Request a Quote
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 xl:gap-8"></div>
      </div>
    </>
  );
};
export default Service;
