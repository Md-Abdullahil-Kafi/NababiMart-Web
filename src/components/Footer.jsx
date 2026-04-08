import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Nababi Mart</h2>
          <p className="text-sm text-gray-500 mt-2">
            আপনার বিশ্বস্ত অনলাইন মার্কেটপ্লেস। সহজ, দ্রুত এবং নির্ভরযোগ্য শপিং অভিজ্ঞতা।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-500">Email: hello.nababimart@gmail.com</p>
          <p className="text-sm text-gray-500">Phone: +880 1761-090417</p>

          <div className="flex gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary"><FaTwitter /></a>
            <a href="#" className="hover:text-primary"><FaInstagram /></a>
            <a href="#" className="hover:text-primary"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nababi Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;