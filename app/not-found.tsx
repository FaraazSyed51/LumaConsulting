import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-osu-scarlet mb-4">404</p>
        <h1 className="text-2xl font-bold text-osu-gray-dark-80 mb-4">
          Page not found
        </h1>
        <p className="text-osu-gray-dark-40 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-osu-scarlet text-white rounded-lg font-semibold hover:bg-osu-scarlet-dark-40 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
