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
              <img src={polisher} alt="group" className="w-[42px]" />
              <h1 className="font-medium text-[16px] text-sm pt-2">
                Excellent client service
              </h1>
              <p className="text-white opacity-90 font-normal text-sm pt-2">
                Our team goes above and beyond to ensure your needs are met with
                personalized attention, making your experience seamless and
                stress-free.
              </p>
            </div>
            <div className="card-box card-cream">
              <img src={pressure} alt="group" className="w-[42px]" />
              <h1 className="text-accent font-medium text-[16px] text-sm pt-2">
                High success rate
              </h1>
              <p className="text-muted font-normal text-sm pt-2">
                We pride ourselves on an impressive 95% success rate, helping
                countless clients achieve their dreams of living an healthy
                life.
              </p>
            </div>
            <div className="card-box card-cream">
              <img src={broom} alt="group" className="w-[42px]" />
              <h1 className="text-accent font-medium text-[16px] text-sm pt-2">
                Professionalism
              </h1>
              <p className="text-muted font-normal text-sm pt-2">
                With years of expertise and a highly trained team, we handle
                every aspect of your environment with the utmost
                professionalism, ensuring your peace of mind.
              </p>
            </div>
            <div className="card-box card-primary text-white sm:col-span-2 xl:col-span-1 animate-float">
              <img src={pressure} alt="group" className="w-[42px]" />
              <h1 className="font-medium text-[16px] text-sm pt-2">
                Worth every penny
              </h1>
              <p className="text-white opacity-90 font-normal text-sm pt-2">
                Our extensive packages gives you trusted access to the best
                services at every core.
              </p>
            </div>
          </div>
          <div className=" grid sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-5 ">
            <div className="flex flex-col">
              <h1 className=" font-bold text-sky-700 text-2xl sm:text-[32px] md:ml-0 lg:ml-80 sm:ml-0">
                Why Scrubb?
              </h1>
              <p className="text-muted font-medium pt-2 max-w-xl">
                At our core, we are dedicated to providing exceptional scrub,
                with a concise detailing which highlights our commitment to a
                sparkling evnvironment.
              </p>
              <button
                type="button"
                className="btn-primary w-fit mt-4"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoreMessage;
