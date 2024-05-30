import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const users = await User.find({}).populate("username");

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch users created by user", {
      status: 500,
    });
  }
};
