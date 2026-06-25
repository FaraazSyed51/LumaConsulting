"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-osu-scarlet font-semibold uppercase tracking-widest text-sm mb-4">
          Something went wrong
        </p>
        <h1 className="text-3xl font-bold text-osu-gray-dark-80 mb-4">
          We hit an unexpected error
        </h1>
        <p className="text-osu-gray-dark-40 mb-8">
          Try again, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-osu-scarlet text-white rounded-lg font-semibold hover:bg-osu-scarlet-dark-40 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-osu-gray-light-40 text-osu-gray-dark-80 rounded-lg font-semibold hover:bg-osu-gray-light-90 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
