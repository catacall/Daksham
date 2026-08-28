"use client";

import { useState, useEffect, startTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle, ArrowRight, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "unauthorized") {
      setError("Access Denied: Only authorized administrator accounts are permitted.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data?.user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      startTransition(() => {
        router.push("/manage");
        router.refresh();
      });
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!forgotEmail.trim()) {
      setError("Please enter your administrator email address.");
      return;
    }

    setForgotLoading(true);

    try {
      await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });

      // Always display generic success message without leaking account existence
      setForgotSent(true);
    } catch {
      setForgotSent(true);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-navy-light/40 rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10">
      
      {/* Logo and Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-auto relative mb-4">
          <Image
            src="/daksham developers.webp"
            alt="Daksham Developers Logo"
            width={180}
            height={60}
            priority
            className="h-full w-auto object-contain"
          />
        </div>
        <h2 className="text-xl font-display font-medium text-white tracking-normal text-center uppercase">
          Manage Console
        </h2>
        <p className="text-xs text-muted/80 font-sans mt-1 text-center font-semibold">
          Administrator Authentication
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Forms Switcher */}
      {showForgot ? (
        forgotSent ? (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-xs text-white/90 font-sans leading-relaxed">
              If an account exists for <strong className="text-gold">{forgotEmail}</strong>, a secure password reset link has been sent. Please check your inbox.
            </p>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowForgot(false);
                setForgotSent(false);
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl gold-gradient text-navy font-bold text-xs uppercase tracking-normal w-full shadow-md"
            >
              Back to Sign In
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <p className="text-xs text-muted/80 font-sans leading-relaxed">
              Provide your administrator email below. We'll verify and dispatch a secure password reset link.
            </p>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-normal text-muted mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@dakshamdevelopers.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-transparent focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                  disabled={forgotLoading}
                />
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={forgotLoading}
              className="w-full flex items-center justify-center gap-2 gold-gradient hover:gold-gradient-light disabled:gold-gradient/50 text-navy font-bold text-xs uppercase tracking-normal py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-gold/10 mt-2"
            >
              {forgotLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </motion.button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setError(null);
                }}
                className="text-xs text-gold hover:text-gold/80 font-sans uppercase tracking-normal font-bold"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )
      ) : (
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-normal text-muted mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                autoComplete="username"
                placeholder="admin@dakshamdevelopers.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-transparent focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold uppercase tracking-normal text-muted">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgot(true);
                  setError(null);
                }}
                className="text-[10px] text-gold hover:text-gold/80 font-bold uppercase tracking-normal"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-transparent focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted/60 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 gold-gradient hover:gold-gradient-light disabled:gold-gradient/50 text-navy font-bold text-xs uppercase tracking-normal py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-gold/10 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>
      )}

      {/* Footer info */}
      <p className="text-[10px] text-center text-muted/60 mt-8 font-sans uppercase tracking-normal">
        Daksham Developers © 2026. Secure Access Only.
      </p>

    </div>
  );
}

function LoginLoading() {
  return (
    <div className="w-full max-w-md bg-navy-light/40 rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10 flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin gold-gradient-text" />
      <p className="text-xs text-muted/80 font-sans mt-4 uppercase tracking-normal font-semibold">
        Initializing Console...
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gold-gradient/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gold-gradient/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Suspense Container for CSR Search Params */}
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
