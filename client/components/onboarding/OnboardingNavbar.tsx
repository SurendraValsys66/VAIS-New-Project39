import { Link } from "react-router-dom";

export default function OnboardingNavbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-valasys-orange to-valasys-orange-light shadow-sm" />
          <span className="text-sm sm:text-base font-semibold tracking-wide text-valasys-gray-900 group-hover:text-valasys-orange transition-colors">
            VALASYS AI SCORE
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-valasys-gray-600 hover:text-valasys-gray-900"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-valasys-gray-600 hover:text-valasys-gray-900"
          >
            Terms and Condition
          </a>
        </nav>
      </div>
    </header>
  );
}
