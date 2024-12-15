// src/components/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200 mt-auto w-full">
      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Crumbfund</h3>
            <p className="text-gray-600 text-sm">Making dreams happen, one crumb at a time.</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <Mail className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">For Creators</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Start a Project</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Creator Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Creator Resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Success Stories</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">For Supporters</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Trust & Safety</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Support Projects</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">FAQs</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>© {currentYear} Crumbfund. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;