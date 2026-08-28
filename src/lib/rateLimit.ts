// In-memory rate limiting utility for login and password reset protection
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

/**
 * Check if an IP / key exceeds the rate limit.
 * @param key Unique identifier (e.g. IP address or email)
 * @param maxAttempts Maximum allowed attempts (default: 5)
 * @param windowMs Window duration in milliseconds (default: 15 minutes)
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = tracker.get(key);

  if (!record || now > record.resetTime) {
    tracker.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remainingAttempts: maxAttempts - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  record.count += 1;
  tracker.set(key, record);

  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Reset rate limit count on successful login.
 */
export function clearRateLimit(key: string): void {
  tracker.delete(key);
}
