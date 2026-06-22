"use client";

import { useState, useEffect, startTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

// Inner component that uses searchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read error from query parameters (e.g. if redirected back with unauthorized status)
  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "unauthorized") {
      setError("Access Denied: Only authorized admin Gmail accounts are permitted.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Submit login request to Payload's built-in authentication endpoint
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data?.user) {
        setError(data?.errors?.[0]?.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // 2. Validate email domain/specific admin account
      const loggedInEmail = data.user.email?.toLowerCase();
      
      // We allow changing this via env variable, defaulting to 'anassayyed000@gmail.com'
      const allowedEmailsEnv = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "anassayyed000@gmail.com";
      const allowedEmails = allowedEmailsEnv.toLowerCase().split(",").map(e => e.trim());

      if (!allowedEmails.includes(loggedInEmail)) {
        // If not authorized, sign out immediately
        await fetch("/api/users/logout", { method: "POST" });
        setError("Access Denied: This account is not authorized to access the Manage Console.");
        setLoading(false);
        return;
      }

      // 3. Success! Redirect to the main manage dashboard
      startTransition(() => {
        router.push("/manage");
        router.refresh();
      });
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-navy-light/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10">
      
      {/* Logo and Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-auto relative mb-4">
          <Image
            src="/daksham developers.png"
            alt="Daksham Developers Logo"
            width={180}
            height={60}
            priority
            className="h-full w-auto object-contain"
          />
        </div>
        <h2 className="text-xl font-display font-medium text-white tracking-wide text-center uppercase">
          Manage Console
        </h2>
        <p className="text-xs text-muted/80 font-sans mt-1 text-center uppercase tracking-widest font-semibold">
          Admin Authentication
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
            Admin Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
              <Mail size={16} />
            </span>
            <input
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-sans"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
              <Lock size={16} />
            </span>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-sans"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:bg-gold/50 text-navy font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-gold/10 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Access Console</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* Footer info */}
      <p className="text-[10px] text-center text-muted/60 mt-8 font-sans uppercase tracking-wider">
        Daksham Developers © 2026. Secure Access Only.
      </p>

    </div>
  );
}

// Loading state while searchParams are loading in Suspense
function LoginLoading() {
  return (
    <div className="w-full max-w-md bg-navy-light/40 backdrop-blur-md rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10 flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-gold" />
      <p className="text-xs text-muted/80 font-sans mt-4 uppercase tracking-widest font-semibold">
        Initializing Console...
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Suspense Container for CSR Search Params */}
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
