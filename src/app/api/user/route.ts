import { NextResponse } from "next/server";
import bycript from "bcrypt";
import { db } from "@/lib/db";
import { z } from "zod";

// define a schema to validate the input data
const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username should be less than 30 characters"),
  email: z.string().min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password should be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists." },
        { status: 409 }
      );
    }
    // check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists." },
        { status: 409 }
      );
    }
    const hashedPassword = await bycript.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser; // remove password from response
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
