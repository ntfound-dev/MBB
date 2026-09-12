"use client";

import { useState } from "react";

export function MemberLogoutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      className="podh-button podh-button-outline"
      disabled={loading}
      onClick={async () => {
        setLoading(true);

        try {
          await fetch("/api/podh-auth/logout", {
            method: "POST",
          });
        } finally {
          window.location.replace("/anggota/masuk");
        }
      }}
    >
      {loading ? "Keluar..." : "Keluar"}
    </button>
  );
}
