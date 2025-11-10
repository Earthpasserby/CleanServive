import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img
            src="/scrubbNewLg-removebg-preview.png"
            alt="logo"
            className="w-36 h-auto object-contain"
          />
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="mt-2 text-muted-dark">
            <FaPhone className="inline mr-2" /> +234 (7067) 87-6791
          </p>
          <p className="mt-1 text-muted-dark">
            <FaEnvelope className="inline mr-2" /> hello@scrubb.example
          </p>
        </div>

        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 space-y-2 text-muted-dark">
            <li>Home</li>
            <li>About</li>
            <li>Pricing</li>
            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="text-left"
              >
                Request a Quote
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Follow Us</h5>
          <div className="flex items-center gap-3 mt-3">
            <a className="social-icon" href="#" aria-label="facebook">
              <FaFacebookF />
            </a>
            <a className="social-icon" href="#" aria-label="twitter">
              <FaTwitter />
            </a>
            <a
              className="social-icon"
              href="https://www.instagram.com/getscrubb/"
              aria-label="instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4">
        <small className="text-muted-dark">
          Copyright © 2025 SCRUBB. All rights reserved.
        </small>
      </div>
    </footer>
  );
};
export default Footer;
