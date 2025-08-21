import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">OopsiPay</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Your one-stop payment solution. Your trusted partner in seamless transactions.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Company</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                About Us
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact/Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Support</h4>
            <div className="flex flex-col space-y-3">
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Help Center
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Contact Us
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                API Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">© 2024 OopsiPay. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
