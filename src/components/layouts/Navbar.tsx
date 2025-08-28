import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import NavConditionalButton from "../NavConditionalButton";
import { useDriver } from "../../hooks/useDriver";

const navItems: { name: string; href: string }[] = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { startTour, destroyTour, isTourActive } = useDriver();

  const navbarTourSteps = useMemo(
    () => [
      {
        element: "#navbar-logo",
        popover: {
          title: "Welcome to OopsiPAY",
          description: "This is our brand logo. Click it to return to the homepage anytime.",
        },
      },
      {
        element: "#navbar-nav-desktop",
        popover: {
          title: "Navigation Menu",
          description: "Explore our main sections: About, Features, FAQ, and Contact information.",
        },
      },

      {
        element: "#navbar-get-started-btn",
        popover: {
          title: "Get Started",
          description: "Click here to sign in or create your OopsiPAY account to start using our services.",
        },
      },
      {
        element: "#navbar-mode-toggle",
        popover: {
          title: "Theme Toggle",
          description: "Switch between light and dark mode.",
        },
      },

      {
        // element: "body", // fallback to a valid selector for steps without a specific element
        popover: {
          title: "Welcome to OopsiPAY",
          description: "Discover our features and services designed to make your payment experience seamless.",
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenTour = localStorage.getItem("navbar-tour-seen");
      const isDesktop = window.innerWidth >= 768; // md breakpoint

      if (!hasSeenTour && isDesktop && !isTourActive()) {
        startTour(navbarTourSteps);
        localStorage.setItem("navbar-tour-seen", "true");
      }
    }, 1000); // 2 second delay to let page load

    return () => clearTimeout(timer);
  }, [startTour, navbarTourSteps, isTourActive]);

  // Example: Destroy tour when sidebar opens
  useEffect(() => {
    if (sidebarOpen) {
      destroyTour(); // This will stop any active tour
    }
  }, [sidebarOpen, destroyTour]);

  // Example: Highlight specific element on hover

  return (
    <div>
      <header
        className={`fixed inset-x-0 top-0 z-50 p-6 transition-all duration-300 ${
          scroll ? "bg-background backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-space-grotesk font-bold text-2xl hidden md:inline" id="navbar-logo">
            <Link to="/">OopsiPAY</Link>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" id="navbar-nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                id={`navbar-link-${item.name}`}
                className=" transition-colors text-lg hover:font-bold"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              className="flex items-center justify-center w-10 h-10 rounded focus:outline-none"
              id="navbar-hamburger"
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
          </div>

          <div>
            <NavConditionalButton />
          </div>
        </nav>
      </header>

      {/* Sidebar Overlay */}
      {
        <>
          <div
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg flex flex-col p-8 transform transition-transform duration-300 ease-in-out ${
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-black/80 hover:text-black transition-colors font-dm-sans text-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <NavConditionalButton />
            </nav>
          </aside>
        </>
      }
    </div>
  );
}
