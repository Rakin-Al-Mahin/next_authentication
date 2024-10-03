"use client";

/* eslint-disable react/prop-types */

import { useState } from "react";

export default function ResetPasswordForm({
  newPassword,
  setNewPassword,
  handleResetPasswordSubmit,
  passwordError,
  handleResetPasswordBlur,
  handleResetPasswordChange,
}) {
  const [showNewPassword, setShowNewPassword] = useState(false);

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
          type={showNewPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={handleResetPasswordChange}
          onBlur={handleResetPasswordBlur}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && (
          <p className="text-sm text-red-600">{passwordError}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showNewPassword}
          onChange={() => setShowNewPassword(!showNewPassword)}
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
