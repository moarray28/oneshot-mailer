"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="landing">

      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className="hero">

        <div className="logo">
          ✉
        </div>

        <h1>
          OneShot Mailer
        </h1>

        <p>
          Personalized outreach.
          <br />
          Delivered beautifully.
        </p>

        <button>
          Loading Dashboard...
        </button>

      </div>

    </main>
  );
}