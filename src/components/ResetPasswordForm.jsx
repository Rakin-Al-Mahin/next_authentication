/* eslint-disable react/prop-types */

export default function ResetPasswordForm({
  newPassword,
  setNewPassword,
  handleResetPasswordSubmit,
}) {
  const togglePasswordVisibility = (e) => {
    const passwordField = document.getElementById("password");
    passwordField.type = e.target.checked ? "text" : "password";
  };

  return (
    <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-black">
        Reset Password
      </h3>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="show-password"
          onChange={togglePasswordVisibility}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="show-password" className="text-sm text-gray-700">
          Show Password
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Reset Password
      </button>
    </form>
  );
}
