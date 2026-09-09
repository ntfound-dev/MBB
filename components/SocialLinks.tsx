"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function SocialLinks() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL || "";
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL || "";
  const email = process.env.NEXT_PUBLIC_EMAIL || "";

  const links: SocialLink[] = [
    ...(instagram
      ? [{ label: "Instagram", href: instagram, icon: <FaInstagram /> }]
      : []),
    ...(whatsapp
      ? [{ label: "WhatsApp", href: whatsapp, icon: <FaWhatsapp /> }]
      : []),
    ...(telegram
      ? [{ label: "Telegram", href: telegram, icon: <FaTelegramPlane /> }]
      : []),
    ...(facebook
      ? [{ label: "Facebook", href: facebook, icon: <FaFacebookF /> }]
      : []),
    ...(email
      ? [{ label: "Email", href: `mailto:${email}`, icon: <MdEmail /> }]
      : []),
  ];

  if (!links.length) {
    return (
      <div className="social-links social-links-preview" aria-label="Media sosial">
        <span title="Instagram" aria-label="Instagram">
          <FaInstagram />
        </span>
        <span title="WhatsApp" aria-label="WhatsApp">
          <FaWhatsapp />
        </span>
        <span title="Telegram" aria-label="Telegram">
          <FaTelegramPlane />
        </span>
        <span title="Facebook" aria-label="Facebook">
          <FaFacebookF />
        </span>
        <span title="Email" aria-label="Email">
          <MdEmail />
        </span>
      </div>
    );
  }

  return (
    <div className="social-links" aria-label="Media sosial resmi">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          title={link.label}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
