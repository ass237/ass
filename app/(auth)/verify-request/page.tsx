export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Email Verification</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Please verify your email address to complete your authentication process.
        </p>
      </div>
    </div>
  );
}
