import { useEffect, useState } from "react";
import { Link } from "react-router";
import NavConditionalButton from "../NavConditionalButton";

const navItems: { name: string; href: string }[] = [
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

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

  return (
    <div>
      <header
        className={`fixed inset-x-0 top-0 z-50 p-6 transition-all duration-300 ${
          scroll ? "bg-background backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-space-grotesk font-bold text-2xl ">
            <Link to="/">OopsiPAY</Link>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className=" transition-colors text-lg hover:font-bold">
                {item.name}
              </Link>
            ))}
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

          <NavConditionalButton />
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
