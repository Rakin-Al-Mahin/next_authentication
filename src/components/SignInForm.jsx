"use client";

/* eslint-disable react/prop-types */

import { useState } from "react";

const SignInForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  handleForgotPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-black">Sign In</h3>

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
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

      <p
        className="text-sm text-blue-500 cursor-pointer hover:underline"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </p>

      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
