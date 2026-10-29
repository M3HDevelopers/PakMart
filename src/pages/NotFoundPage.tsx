import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-[var(--color-border-strong)] mb-4">404</p>
        <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-2">Page Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--color-border-strong)] text-[var(--color-text)] text-sm font-medium hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            <Home size={16} /> Home Page
          </Link>
          <Link
            to="/search"
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--color-border-strong)] text-[var(--color-text)] text-sm font-medium hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <Search size={16} /> Search Products
          </Link>
        </div>
      </div>
    </div>
  );
}
