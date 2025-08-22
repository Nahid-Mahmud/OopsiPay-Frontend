export default function HoverButton() {
  return (
    <button className="cursor-pointer group relative bg-white hover:bg-zinc-300 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-56 h-12">
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">Download Now</span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            Coming Soon
          </span>
        </span>

        {/* <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" viewBox="0 0 24 24">
          <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="white"
            d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
          ></path>
        </svg> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-corner-left-down-icon lucide-corner-left-down group-hover:rotate-90 transition-transform duration-200"
        >
          <path d="m14 15-5 5-5-5" />
          <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
        </svg>
      </div>
    </button>
  );
}
