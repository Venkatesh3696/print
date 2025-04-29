import React from "react";
import { Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 p-5 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold">REACH OUT TO US</h2>
          <p className="mt-2">
            Beside HR Tower, Manuas Reality Road Agroha Colony Raipur,
            Chhattisgarh 492001
          </p>
          <p className="mt-2">Company Name: HK Enterprises</p>
          <p className="mt-2 flex items-center">
            <span className="mr-2">✉</span> order@printmine.in
          </p>
          <p className="mt-2 flex items-center">
            <span className="mr-2">📞</span> +91 6262427271
          </p>
          <div className="mt-4 flex space-x-4">
            <Facebook className="icons" />
            <Twitter className="icons" />
            <Youtube className="icons" />
            <MessageCircle className="icons" />
          </div>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="text-lg font-bold">Help</h2>
          <ul className="mt-2 space-y-2">
            <li className="footer-name">
              <a href="#">My Account</a>
            </li>
            <li className="footer-name">
              <a href="#">Cancellation & Refund</a>
            </li>
            <li className="footer-name">
              <a href="#">Shipping & Delivery Policy</a>
            </li>
            <li className="footer-name">
              <a href="#">Terms & Conditions</a>
            </li>
            <li className="footer-name">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Collections Section */}
        <div>
          <h2 className="text-lg font-bold">Collections</h2>
          <ul className="mt-2 space-y-2">
            <li className="footer-name">
              <a href="#">Metal Keychain</a>
            </li>
            <li className="footer-name">
              <a href="#">Mobile Stand</a>
            </li>
            <li className="footer-name">
              <a href="#">Metal Pens</a>
            </li>
            <li className="footer-name">
              <a href="#">Magnetic Badges</a>
            </li>
            <li className="footer-name">
              <a href="#">All</a>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold">Our Company</h2>
          <ul className="mt-2 space-y-2">
            <li className="footer-name">
              <a href="#">About Us</a>
            </li>
            <li className="footer-name">
              <a href="#">Media Coverage</a>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="text-center m-4">
        Copyright © 2025 <span className="text-blue-500">PrintMine.in</span> all
        rights reserved.
      </h2>
    </footer>
  );
};

export default Footer;
