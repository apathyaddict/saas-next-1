import Message from "@/models/message";
import PDF from "@/models/pdf";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { fileId, userId, message } = body; // Ensure you get all necessary values from the request body

    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const file = await PDF.findOne({
      _id: fileId,
      userId: userId,
    }).populate("userId");

    if (!file) {
      return new Response("Not found", { status: 404 });
    }

    const newMessage = await Message.create({
      text: message,
      isUserMessage: true,
      userId: userId,
      fileId: fileId,
    });

    return new Response(JSON.stringify(newMessage), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
