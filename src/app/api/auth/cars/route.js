// src/app/api/auth/cars/route.js
import cars from "@/data/cars";

export async function GET(req) {
  return new Response(JSON.stringify(cars), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
