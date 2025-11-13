'use client';

/**
 * Footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="max-w-[1200px] mx-auto px-5 py-16 text-center pb-[200px]">
        <h2 className="text-white text-3xl font-semibold mb-4">
          Prenez le contrôle de vos finances
        </h2>
        <p className="text-rollbar-gray-text text-lg mb-8 max-w-[600px] mx-auto">
          Suivez vos dépenses, gérez votre budget et atteignez vos objectifs financiers.
        </p>
        <p className="text-rollbar-gray-text text-sm">
          © {currentYear} Budget Personnel. Toutes vos données sont stockées localement sur votre appareil.
        </p>
      </div>
      <div className="footer-pattern"></div>
    </footer>
  );
}
