"use client";

/* eslint-disable react/prop-types */

import { useState } from "react";

export default function SignUpForm({
  email,
  password,
  setEmail,
  setPassword,
  zone,
  setZone,
  zones,
  handleSubmit,
  error,
  zoneError,
  handlePasswordBlur,
  passwordError,
  handlePasswordChange,
  confirmPassword,
  handleConfirmPasswordChange,
  handleConfirmPasswordBlur,
  confirmPasswordError,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-black">Sign Up</h3>

      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">Email</label> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">
          Password
        </label> */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
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
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Show Password</label>
      </div>

      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label> */}
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {confirmPasswordError && (
          <p className="text-sm text-red-600">{confirmPasswordError}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showConfirmPassword}
          onChange={() => setShowConfirmPassword(!showConfirmPassword)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Show Confirm Password</label>
      </div>

      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">Zone</label> */}
        {zoneError ? (
          <p className="text-sm text-red-600">{zoneError}</p>
        ) : (
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
            className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select your zone
            </option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
}
