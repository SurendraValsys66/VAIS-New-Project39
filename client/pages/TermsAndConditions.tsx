export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-valasys-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-valasys-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-valasys-gray-800 mb-4">
          By using this platform you agree to these terms. Please read them carefully.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">Use of Service</h2>
        <p className="text-valasys-gray-800 mb-4">
          You must use the service in compliance with applicable laws and our acceptable use policies. Accounts may be suspended for abuse or security risks.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">Subscriptions and Billing</h2>
        <p className="text-valasys-gray-800 mb-4">
          Features and credits are provided according to your plan. Pricing and terms may change with notice.
        </p>
        <h2 className="text-lg font-semibold text-valasys-gray-900 mt-8 mb-2">Limitation of Liability</h2>
        <p className="text-valasys-gray-800 mb-4">
          The service is provided as-is to the extent permitted by law. We are not liable for indirect or consequential damages.
        </p>
      </div>
    </div>
  );
}
