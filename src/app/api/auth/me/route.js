import { decodeToken } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];
  const userData = decodeToken(token);

  if (!userData) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const users = await getCollection("users");
  const user = await users.findOne({ _id: new ObjectId(userData.id) });

  return Response.json({
    email: user.email,
    createdAt: user.createdAt,
  });
}
