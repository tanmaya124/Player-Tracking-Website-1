import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

// Validation schema for request body
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // TODO: Check if user already exists in your database
    // This is where you would typically check your database
    // For now, we'll simulate this check
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Store the user in your database
    // This is where you would save the user to your database
    // For now, we'll just return a success response
    
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}