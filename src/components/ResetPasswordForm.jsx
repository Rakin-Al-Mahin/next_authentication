"use client";

/* eslint-disable react/prop-types */

import { useState } from "react";

export default function ResetPasswordForm({
  newPassword,
  setNewPassword,
  handleResetPasswordSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-black">
        Reset Password
      </h3>

      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">
          New Password
        </label> */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-blue-600">
          * Password must be at least 6 characters long.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Show Password</label>
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
