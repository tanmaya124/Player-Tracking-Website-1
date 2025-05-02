"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = event.currentTarget.elements.namedItem("password") as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Login successful! Redirecting...");
      router.push("/");
    } else {
      alert(result.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Branding */}
      <a href="/" className="flex items-center justify-center mb-8">
        <MapPin className="h-7 w-7 text-yellow-500" />
        <span className="ml-3 text-2xl font-extrabold text-gray-800 font-sans tracking-wide">
          Redback Operations
        </span>
      </a>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300" 
              placeholder="Enter your email address" 
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300" 
              placeholder="Enter your password" 
            />
          </div>
          <div className="text-right text-sm">
            <a href="#" className="text-yellow-500 hover:underline">Forgotten your password?</a>
          </div>
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition">
            Sign In
          </button>
        </form>
        <div className="text-sm text-center mt-6 text-gray-600">
          Lost your sign up email? <a href="/signup" className="text-yellow-500 hover:underline">Resend Confirmation Email</a>
        </div>
      </div>
    </div>
  );
}
