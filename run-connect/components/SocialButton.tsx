"use client";

// components/SocialButton.tsx
// Tombol media sosial berlogo sesuai prototipe dan PRD
// WhatsApp (gradasi hijau), Instagram (gradasi ungu), Email/Website/Lainnya (kartu/border)

import React from "react";

export type SocialType = "wa" | "ig" | "ml" | "wb" | "tt";

interface SocialButtonProps {
  type: SocialType;
  text?: string;
  href?: string;
  onClick?: () => void;
}

export default function SocialButton({
  type,
  text,
  href,
  onClick,
}: SocialButtonProps) {
  // Label default jika text tidak disediakan
  const defaultLabel: Record<SocialType, string> = {
    wa: "WhatsApp",
    ig: "Instagram",
    ml: "Email",
    wb: "Website",
    tt: "TikTok",
  };

  const label = text || defaultLabel[type];

  // Kelas gaya tombol sosial dari prototipe (.sbt.wa, .sbt.ig, .sbt.ot)
  const styleClass: Record<SocialType, string> = {
    wa: "sbt wa",
    ig: "sbt ig",
    ml: "sbt ot",
    wb: "sbt ot",
    tt: "sbt ot",
  };

  // Ikon SVG persis dari prototipe Run_Connect.html baris 186-189
  const renderIcon = () => {
    switch (type) {
      case "wa":
        return (
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.4A10 10 0 1 0 12 2zm5.3 14.3c-.2.6-1.3 1.1-1.8 1.2-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z" />
          </svg>
        );
      case "ig":
        return (
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        );
      case "ml":
        return (
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        );
      case "wb":
        return (
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
          </svg>
        );
      case "tt":
        return (
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 3c.3 2.3 1.7 3.8 4 4v3c-1.5 0-2.900-.5-4-1.300V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.200a3 3 0 1 0 2 2.800V3h3z" />
          </svg>
        );
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={styleClass[type]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {renderIcon()}
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={styleClass[type]}
      onClick={onClick}
    >
      {renderIcon()}
      {label}
    </button>
  );
}
