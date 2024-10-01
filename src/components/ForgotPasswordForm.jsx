/* eslint-disable react/prop-types */

export default function ForgotPasswordForm({
  email,
  setEmail,
  handleForgotPasswordSubmit,
}) {
  return (
    <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-black">
        Forgot Password
      </h3>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Send Reset Link
      </button>
    </form>
  );
}
