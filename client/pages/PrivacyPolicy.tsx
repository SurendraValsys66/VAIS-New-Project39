export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-valasys-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-valasys-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-valasys-gray-800 mb-4">
          We value your privacy. This page explains what information we collect,
          how we use it, and your rights.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">
          Information We Collect
        </h2>
        <p className="text-valasys-gray-800 mb-4">
          We collect information you provide directly (such as account details)
          and information collected automatically (such as usage data and
          cookies) to improve our services.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">
          How We Use Information
        </h2>
        <p className="text-valasys-gray-800 mb-4">
          We use data to provide and improve the platform, personalize your
          experience, communicate updates, and ensure security and compliance.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">
          Your Rights
        </h2>
        <p className="text-valasys-gray-800 mb-4">
          You can request access, correction, deletion, or export of your data.
          Contact support for assistance.
        </p>
      </div>
    </div>
  );
}
