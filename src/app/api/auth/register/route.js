import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

let client; // singleton MongoClient

async function getClient() {
  if (!client) {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing environment variable: MONGODB_URI");
    }
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client;
}

async function getUsersCollection() {
  const client = await getClient();
  return client.db("EJP-Assignment").collection("accounts");
}

// Email and password validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export async function POST(req) {
  try {
    const body = await req.json();
    let { username, email, password } = body;

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Normalize email
    email = email.trim().toLowerCase();

    // Validate email
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
      });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return new Response(
        JSON.stringify({
          error:
            "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
        }),
        { status: 400 }
      );
    }

    const users = await getUsersCollection();

    // Check if user exists
    const exists = await users.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await users.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Account created!" }), {
      status: 201,
    });
  } catch (e) {
    console.error("Registration error:", e);
    return new Response(
      JSON.stringify({ error: e.message || "Server error" }),
      { status: 500 }
    );
  }
}
