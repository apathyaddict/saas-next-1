import User from "../../../models/user";
import connectDB from "../../../utils/database";

export const GET = async (request) => {
  try {
    await connectDB();

    const users = await User.find({}).populate("creator");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users created by user", {
      status: 500,
    });
  }
};
