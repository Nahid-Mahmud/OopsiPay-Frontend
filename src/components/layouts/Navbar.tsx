import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //   disable scroll when sidebar is open

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-10 p-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-space-grotesk font-bold text-2xl text-black">OopsiPAY</div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-black/80 hover:text-black transition-colors font-dm-sans">
              Features
            </a>
            <a href="#" className="text-black/80 hover:text-black transition-colors font-dm-sans">
              Business
            </a>
            <a href="#" className="text-black/80 hover:text-black transition-colors font-dm-sans">
              Support
            </a>
            <a href="#" className="text-black/80 hover:text-black transition-colors font-dm-sans">
              About
            </a>
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black w-7 h-7"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Button variant="secondary" className="font-dm-sans font-medium hidden md:inline-flex">
            Get Started
          </Button>
        </nav>
      </header>

      {/* Sidebar Overlay */}
      {
        <>
          <div
            className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ease-in-out ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white z-40 shadow-lg flex flex-col p-8 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-space-grotesk font-bold text-2xl text-black">OopsiPAY</span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <a
                href="#"
                className="text-black/80 hover:text-black transition-colors font-dm-sans text-lg"
                onClick={() => setSidebarOpen(false)}
              >
                Features
              </a>
              <a
                href="#"
                className="text-black/80 hover:text-black transition-colors font-dm-sans text-lg"
                onClick={() => setSidebarOpen(false)}
              >
                Business
              </a>
              <a
                href="#"
                className="text-black/80 hover:text-black transition-colors font-dm-sans text-lg"
                onClick={() => setSidebarOpen(false)}
              >
                Support
              </a>
              <a
                href="#"
                className="text-black/80 hover:text-black transition-colors font-dm-sans text-lg"
                onClick={() => setSidebarOpen(false)}
              >
                About
              </a>
              <Button variant="secondary" className="font-dm-sans font-medium mt-8">
                Get Started
              </Button>
            </nav>
          </aside>
        </>
      }
    </div>
  );
}
