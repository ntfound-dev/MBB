"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiLoader, FiXCircle } from "react-icons/fi";
import { AppFooter } from "@/components/AppFooter";
import { Header } from "@/components/Header";

type State = "loading" | "success" | "error";

export default function MemberAuthCallbackPage() {
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState("Menyelesaikan proses masuk...");

  useEffect(() => {
    let active = true;

    async function exchange() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        if (active) {
          setState("error");
          setMessage("Kode login tidak ditemukan.");
        }
        return;
      }

      try {
        const response = await fetch("/api/podh-auth/exchange", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Login gagal.");
        }

        if (!active) {
          return;
        }

        setState("success");
        setMessage("Login berhasil. Mengarahkan ke akun PODH...");

        const destination = data?.user?.member ? "/anggota" : "/anggota/daftar";
        window.location.replace(destination);
      } catch (error) {
        if (!active) {
          return;
        }

        setState("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyelesaikan login.",
        );
      }
    }

    exchange();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Header />

      <main className="account-page">
        <section className="account-card member-login-card">
          <div className="account-icon" aria-hidden="true">
            {state === "loading" && <FiLoader />}
            {state === "success" && <FiCheckCircle />}
            {state === "error" && <FiXCircle />}
          </div>

          <span className="eyebrow">AKUN ANGGOTA PODH</span>
          <h1>
            {state === "loading"
              ? "Memproses login."
              : state === "success"
                ? "Login berhasil."
                : "Login gagal."}
          </h1>
          <p>{message}</p>

          {state === "error" && (
            <a className="podh-button podh-button-dark" href="/anggota/masuk">
              Kembali ke halaman masuk
            </a>
          )}
        </section>
      </main>

      <AppFooter />
    </>
  );
}
