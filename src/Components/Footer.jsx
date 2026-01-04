import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <img
            src="/scrubbNewLg-removebg-preview.png"
            alt="logo"
            className="w-32 h-auto object-contain"
          />
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Professional cleaning services tailored to your lifestyle.
            Experience the difference of a truly clean home.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-lg mb-4 text-amber-500">Contact</h5>
          <p className="mt-2 text-slate-300 flex items-center gap-2 hover:text-white transition-colors">
            {/* <FaPhone className="text-sky-500" /> +234 (7067) 87-6791 */}
          </p>
          <p className="mt-3 text-slate-300 flex items-center gap-2 hover:text-white transition-colors">
            <FaEnvelope className="text-sky-500" /> Admin@scrubb.com
          </p>
        </div>

        <div>
          <h5 className="font-bold text-lg mb-4 text-amber-500">Quick Links</h5>
          <ul className="space-y-3 text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer">
              Home
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
              About
            </li>
            <li className="hover:text-white transition-colors cursor-pointer">
              Pricing
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="text-left hover:text-white transition-colors"
              >
                Request a Quote
              </button>
            </li>
            <li>
              <a
                href="https://forms.gle/BTCTMdHi4kZrmPhE8"
                target="_blank"
                rel="noreferrer noopener"
                className="text-left hover:text-white transition-colors"
              >
                Join the Team
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-lg mb-4 text-amber-500">Follow Us</h5>
          <div className="flex items-center gap-4 mt-2">
            <a
              className="social-icon bg-slate-800 hover:bg-sky-600 transition-all"
              href="#"
              aria-label="facebook"
            >
              <FaFacebookF />
            </a>
            <a
              className="social-icon bg-slate-800 hover:bg-sky-600 transition-all"
              href="#"
              aria-label="twitter"
            >
              <FaTwitter />
            </a>
            <a
              className="social-icon bg-slate-800 hover:bg-sky-600 transition-all"
              href="https://www.instagram.com/getscrubb/"
              aria-label="instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-8">
        <small className="text-slate-500">
          Copyright © 2025 SCRUBB. All rights reserved.
        </small>
      </div>
    </footer>
  );
};
export default Footer;
