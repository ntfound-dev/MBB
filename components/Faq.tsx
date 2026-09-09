"use client";

import { useState } from "react";
import { siteData } from "@/lib/site-data";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {siteData.faq.map((item, index) => {
        const open = openIndex === index;

        return (
          <article className="faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <strong>{open ? "−" : "+"}</strong>
            </button>

            {open && <p>{item.answer}</p>}
          </article>
        );
      })}
    </div>
  );
}
