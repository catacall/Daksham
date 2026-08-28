"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Live Password Strength Calculations
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

  const score = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
  
  let strengthLabel = "";
  let strengthColor = "bg-gray-300";
  if (newPassword.length > 0) {
    if (score <= 2) {
      strengthLabel = "Weak";
      strengthColor = "bg-red-500";
    } else if (score === 3 || score === 4) {
      strengthLabel = "Fair";
      strengthColor = "bg-yellow-500";
    } else if (score === 5) {
      strengthLabel = "Strong";
      strengthColor = "bg-emerald-500";
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing password reset token. Please request a new reset link.");
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError("Please ensure your new password satisfies all security requirements below.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Confirm New Password does not match New Password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.errors?.[0]?.message || "Failed to reset password. Token may have expired.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/manage/login");
      }, 3000);
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-navy-light/40 rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-14 w-auto relative mb-3">
          <Image
            src="/daksham developers.webp"
            alt="Daksham Developers Logo"
            width={160}
            height={50}
            priority
            className="h-full w-auto object-contain"
          />
        </div>
        <h2 className="text-xl font-display font-medium text-white tracking-normal text-center uppercase">
          Create New Password
        </h2>
        <p className="text-xs text-muted/80 font-sans mt-1 text-center font-semibold">
          Set up secure credentials for Manage Console
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Success View */}
      {success ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white uppercase tracking-normal">
              Password Reset Successfully
            </h3>
            <p className="text-xs text-muted/80 font-sans leading-relaxed">
              Your administrator credentials have been updated securely. Redirecting to Sign In...
            </p>
          </div>
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-gold" />
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-normal text-muted mb-2">
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
                <Lock size={16} />
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-transparent focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted/60 hover:text-white transition-colors cursor-pointer"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength indicator */}
            {newPassword.length > 0 && (
              <div className="mt-2.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-normal">
                  <span className="text-muted/70">Strength:</span>
                  <span className={strengthLabel === "Strong" ? "text-emerald-400" : strengthLabel === "Fair" ? "text-yellow-400" : "text-red-400"}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${(score / 5) * 100}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-normal text-muted mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted/60">
                <Lock size={16} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3.5 bg-navy/60 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-transparent focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted/60 hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Requirements List */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2 text-[11px] font-sans">
            <p className="font-bold text-white/80 uppercase tracking-normal text-[10px] flex items-center gap-1.5 mb-1">
              <ShieldCheck size={14} className="text-gold" />
              Password Security Rules
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-muted/70">
              <span className={hasMinLength ? "text-emerald-400 font-semibold" : ""}>✓ 8+ Characters</span>
              <span className={hasUppercase ? "text-emerald-400 font-semibold" : ""}>✓ Uppercase Letter</span>
              <span className={hasLowercase ? "text-emerald-400 font-semibold" : ""}>✓ Lowercase Letter</span>
              <span className={hasNumber ? "text-emerald-400 font-semibold" : ""}>✓ Number (0-9)</span>
              <span className={hasSpecial ? "text-emerald-400 font-semibold" : ""}>✓ Special Character</span>
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
                <span>Resetting Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full max-w-md bg-navy-light/40 rounded-3xl border border-white/5 p-8 shadow-2xl relative z-10 flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin gold-gradient-text" />
      <p className="text-xs text-muted/80 font-sans mt-4 uppercase tracking-normal font-semibold">
        Initializing Security Portal...
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gold-gradient/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gold-gradient/5 rounded-full blur-[100px] pointer-events-none" />
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
