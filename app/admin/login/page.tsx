"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body?.error || "Invalid password");
        return;
      }

      router.push("/admin");
    } catch (error) {
      console.error(error);
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-background  text-theme-text">
      <Header variant="dark" />
      <main className="container-app min-h-screen flex justify-center items-center container-px py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-golden-300 p-10 shadow-xl bg-white">
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Enter the admin password to manage events and export the database.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium">Admin Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border px-4 py-3 focus:border-golden-200 focus:outline-none focus:ring-2 focus:ring-golden-200"
                placeholder="Enter admin password"
                required
              />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-golden-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-golden-500 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
