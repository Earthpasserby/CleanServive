import React from "react";
import { Link } from "react-router-dom";
import broom from "../assets/broom.png";
import polisher from "../assets/polisher.png";
import pressure from "../assets/pressure.png";

const CoreMessage = () => {
  return (
    <>
      <div className="mx-auto w-full px-4 sm:px-14 lg:px-14 pt-8 sm:pt-24 bg-gradient-to-l from-white to-white-100">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 xl:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-24">
            <div className="card-box card-primary text-white sm:hidden xl:inline-block animate-float">
              <img src={pressure} alt="group" className="w-[42px]" loading="lazy" />
              <h1 className="font-medium text-[16px] text-sm pt-2">
                Parenting
              </h1>
              <p className="text-white opacity-90 font-normal text-sm pt-2">
                Juggling work and kids? Let us handle the sweeping and scrubbing so you can spend your precious time on what truly matters—your family.
              </p>
            </div>
            <div className="card-box card-cream">
              <img src={polisher} alt="group" className="w-[42px]" loading="lazy" />
              <h1 className="text-accent font-medium text-[16px] text-sm pt-2">
                Working Class
              </h1>
              <p className="text-muted font-normal text-sm pt-2">
                Come home to a spotless space after a long day at work. Regain your weekends and leave the dust, grime, and deep cleaning to our expert team.
              </p>
            </div>
            <div className="card-box card-cream">
              <img src={broom} alt="group" className="w-[42px]" loading="lazy" />
              <h1 className="text-accent font-medium text-[16px] text-sm pt-2">
                Post-Construction
              </h1>
              <p className="text-muted font-normal text-sm pt-2">
                Just finished a renovation or new build? We tackle the heavy dust, debris, and tough messes, leaving your flawless new space move-in ready.
              </p>
            </div>
            <div className="card-box card-primary text-white sm:col-span-2 xl:col-span-1 animate-float">
              <img src={pressure} alt="group" className="w-[42px]" loading="lazy" />
              <h1 className="font-medium text-[16px] text-sm pt-2">
                B2B & Offices
              </h1>
              <p className="text-white opacity-90 font-normal text-sm pt-2">
                A clean workspace boosts productivity and impresses clients. We provide reliable, discreet, and thorough cleaning tailored to businesses of all sizes.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center xl:pl-12 gap-5 mb-16 xl:mb-0">
            <h1 className="font-bold text-sky-700 text-3xl sm:text-4xl text-left">
              Why ScrubbPro?
            </h1>
            <p className="text-muted font-normal text-base sm:text-lg leading-relaxed max-w-xl text-left">
              At ScrubbPro, we understand that every client has unique needs. Whether you're a busy parent, a hardworking professional, recovering from renovations, or a growing business, we provide exceptional, tailored cleaning services that let you focus on what you do best.
            </p>
            <button
              type="button"
              className="btn-primary w-fit mt-2 px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openQuoteModal"))
              }
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoreMessage;
