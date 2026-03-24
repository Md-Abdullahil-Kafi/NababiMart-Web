import { useState } from "react";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/8801761090417",
    bg: "bg-green-500 hover:bg-green-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .18 5.34.18 11.88c0 2.1.54 4.14 1.62 5.94L0 24l6.36-1.68a11.86 11.86 0 0 0 5.7 1.44h.06c6.54 0 11.88-5.34 11.88-11.88 0-3.18-1.26-6.18-3.48-8.4ZM12.12 21.6h-.06a9.8 9.8 0 0 1-5.04-1.38l-.36-.24-3.78.96 1.02-3.66-.24-.36a9.8 9.8 0 0 1-1.5-5.22c0-5.4 4.38-9.78 9.84-9.78 2.64 0 5.1 1.02 6.96 2.88a9.73 9.73 0 0 1 2.88 6.96c0 5.4-4.44 9.84-9.72 9.84Zm5.4-7.32c-.3-.12-1.8-.9-2.1-.96-.24-.12-.42-.18-.6.18s-.72.96-.9 1.14c-.12.18-.3.18-.6.06a8.11 8.11 0 0 1-2.4-1.5 8.94 8.94 0 0 1-1.68-2.1c-.18-.3 0-.42.12-.6.12-.12.3-.3.42-.48.12-.12.18-.3.3-.48.12-.18.06-.36 0-.48-.06-.12-.6-1.44-.84-1.98-.18-.48-.42-.42-.6-.42h-.54c-.18 0-.48.06-.72.3s-.96.9-.96 2.16.96 2.46 1.08 2.64c.12.18 1.92 2.94 4.68 4.08.6.24 1.08.42 1.44.54.6.18 1.14.12 1.56.06.48-.06 1.8-.72 2.04-1.38.24-.66.24-1.26.18-1.38-.06-.12-.24-.18-.54-.3Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/nababimartbd",
    bg: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.12 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.03 1.79-4.7 4.54-4.7 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.96.94-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.07 24 18.09 24 12.07Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@nababimart?si=WgHG_jpvVA_xToYp",
    bg: " hover:bg-red-700",
    icon: (
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="red" d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"/><path fill="#ffffff" d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"/></svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/abdul-hadi-3a4610254?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    bg: "bg-sky-600 hover:bg-sky-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M4.98 3.5A2.49 2.49 0 1 1 2.5 6 2.49 2.49 0 0 1 4.98 3.5ZM2.8 8.8h4.36V21H2.8ZM9.9 8.8h4.18v1.67h.06a4.58 4.58 0 0 1 4.12-2.26c4.4 0 5.22 2.9 5.22 6.66V21h-4.35v-5.3c0-1.27 0-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21H9.9Z" />
      </svg>
    ),
  },
];

const positions = [
  { x: 0, y: -90 },
  { x: -70, y: -70 },
  { x: -90, y: 0 },
  { x: -70, y: 70 },
];

const SocialFab = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-18 z-50">
      <div className="relative w-16 h-16">
        {socials.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.name}
            title={item.name}
            className={`absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ${
              item.bg
            } ${open ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
            style={{
              transform: open
                ? `translate(${positions[index].x}px, ${positions[index].y}px)`
                : "translate(0px, 0px)",
            }}
          >
            {item.icon}
          </a>
        ))}

        <button
          type="button"
          aria-label="Open social links"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-0 bottom-0 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl transition hover:bg-violet-700"
        >
          {/* <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg> */}

          <img className="rounded-full" src="11255982.gif" alt="" />
        </button>
      </div>
    </div>
  );
};

export default SocialFab;