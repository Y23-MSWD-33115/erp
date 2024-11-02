import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setIsLoading(true); // Show loading state

    try {
      // Send OTP request
      const response = await fetch("http://localhost:3008/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.msg === "success") {
        // Show OTP verification component if success
        setShowOTPVerification(true);
      } else {
        setError(data.data); // Display error message
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <input
        placeholder="Email"
        className="border-black border-2 px-4 py-2 mb-4"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        className="border-black border-2 px-4 py-2 mb-4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`px-6 py-3 rounded-lg bg-red-600 text-white ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Sending OTP..." : "Login"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {showOTPVerification && <p>OTP verification in progress...</p>}
    </div>
  );
};

export default Login;
