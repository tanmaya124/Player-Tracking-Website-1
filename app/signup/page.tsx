"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = emailInput.value;

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Signup successful! Redirecting to login page...");
      router.push("/login");
    } else {
      alert(result.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Branding */}
        <a href="/" className="flex items-center justify-center mb-6">
          <MapPin className="h-6 w-6 text-yellow-500" />
          <span className="ml-2 text-xl font-bold  text-gray-800">Redback Operations</span>
        </a>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition">
            Resend Instructions
          </button>
        </form>
        <div className="text-sm text-center mt-6 text-gray-600">
          Already have an account? <a href="/login" className="text-yellow-500 hover:underline">Sign In</a>
        </div>
      </div>
    </div>
  );
}
