"use client";

/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import google_logo from "../../../public/images/google-logo.png";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zone, setZone] = useState("");
  const [zones, setZones] = useState([]);
  const [error, setError] = useState(null);
  const [zoneError, setZoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      setResetToken(token);
      setIsResetPassword(true);
    }
  }, []);

  useEffect(() => {
    if (isSignUp) {
      fetchZones();
    }
  }, [isSignUp]);

  //   const domain = "http://localhost:5000";
  const domain = "https://pengooin-testing-by-rakin-v1.vercel.app";

  const fetchZones = async () => {
    try {
      const response = await fetch(`${domain}/api/zone/get-all-zone`);
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setZones(result.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (zoneError) {
      setZoneError("Failed to load zones");
    }
  };

  // For Sign up

  // Validate password when user leaves the password field
  const handlePasswordBlur = () => {
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  // Clear error as soon as user starts typing again
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError && e.target.value.length >= 6) {
      setPasswordError(""); // Clear the error if the user types a valid password
    }
  };

  // For Confirm Password

  // Validate confirm password on blur
  const handleConfirmPasswordBlur = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(""); // Clear error if passwords match
    }
  };

  // Clear confirm password error when user types
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("Passwords do not match.");
    }
  };

  // For Reset Password

  // Validate password when user leaves the password field
  const handleResetPasswordBlur = () => {
    if (newPassword && newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  // Clear error as soon as user starts typing again
  const handleResetPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (passwordError && e.target.value.length >= 6) {
      setPasswordError(""); // Clear the error if the user types a valid password
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const url = isSignUp ? "/api/auth/register" : "/api/auth/login";
      const payload = JSON.stringify(
        isSignUp ? { email, password, zone } : { email, password }
      );

      const response = await fetch(domain + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });

      if (response.ok) {
        isSignUp
          ? setSuccessMessage("Sign up successful")
          : setSuccessMessage("Sign in successful");
      } else if (response.status === 409) {
        setError("Email already exists.");
      } else {
        isSignUp
          ? setError("Failed to authenticate. Please try again.")
          : setError("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      console.error("Authentication error", error);
      setError("Failed to authenticate. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${domain}/api/auth/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage("Reset link sent to your email.");
      } else {
        setError("Failed to send reset email.");
      }
    } catch (error) {
      setError("Failed to send reset email.");
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${domain}/api/auth/reset/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successful. You can now sign in.");
        // setIsResetPassword(false);
        setEmail("");
        setPassword("");
        // Redirect to external site after 2 seconds
        setTimeout(() => {
          window.location.href =
            // router.push =
            "https://next-authentication-tau.vercel.app/auth";
        }, 2000);
      } else {
        setError("Failed to reset password.");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setError("Failed to reset password.");
    }
  };

  const handleForgotPassword = () => {
    setError(null);
    setSuccessMessage(null);
    setIsForgotPassword(true);
    // setEmail("");
  };

  const handleGoogleSignInUp = () => {
    window.location.href =
      //   "https://pengooin-testing-by-rakin-v1.vercel.app/api/auth/google";
      `${domain}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center bg-black-100">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-md rounded-lg mt-10">
        <div className="flex justify-around mb-6">
          {!isResetPassword && (
            <>
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setIsForgotPassword(false);
                  setSuccessMessage(null);
                  setError(null);
                  setEmail("");
                  setPassword("");
                }}
                className={`px-4 py-2 font-semibold rounded hover:bg-blue-600 ${
                  !isSignUp ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setIsForgotPassword(false);
                  setSuccessMessage(null);
                  setError(null);
                  setEmail("");
                  setPassword("");
                  setZone("");
                }}
                className={`px-4 py-2 font-semibold rounded hover:bg-blue-600 ${
                  isSignUp ? "bg-blue-500 text-white" : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            <p>{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {isResetPassword ? (
          <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handleResetPasswordSubmit={handleResetPasswordSubmit}
            passwordError={passwordError}
            handleResetPasswordBlur={handleResetPasswordBlur}
            handleResetPasswordChange={handleResetPasswordChange}
          />
        ) : isForgotPassword ? (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
          />
        ) : isSignUp ? (
          <>
            <SignUpForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              zone={zone}
              setZone={setZone}
              zones={zones}
              handleSubmit={handleSubmit}
              error={error}
              zoneError={zoneError}
              passwordError={passwordError}
              handlePasswordBlur={handlePasswordBlur}
              handlePasswordChange={handlePasswordChange}
              confirmPassword={confirmPassword}
              handleConfirmPasswordChange={handleConfirmPasswordChange}
              handleConfirmPasswordBlur={handleConfirmPasswordBlur}
              confirmPasswordError={confirmPasswordError}
            />
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                onClick={handleGoogleSignInUp}
                className="flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Image
                  src={google_logo}
                  alt="Google-logo"
                  width={25}
                  height={25}
                />
                <span className="ml-2">Sign up with Google</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <SignInForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleForgotPassword={handleForgotPassword}
            />
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                onClick={handleGoogleSignInUp}
                className="flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Image
                  src={google_logo}
                  alt="Google-logo"
                  width={25}
                  height={25}
                />
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
