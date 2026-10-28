import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-off-white min-h-[80vh] px-5 py-28 flex items-center justify-center">
      <div className="max-w-lg w-full text-center space-y-6">
        <p className="font-display text-7xl sm:text-8xl font-medium text-[#8A6A12] leading-none">
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl uppercase text-navy">
          Page Not Found
        </h1>
        <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
          The page you are looking for does not exist or may have been moved.
          Please check the address, or explore our projects below.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white text-xs font-sans font-bold uppercase tracking-normal hover:bg-navy-light transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border-light text-navy text-xs font-sans font-bold uppercase tracking-normal hover:bg-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
