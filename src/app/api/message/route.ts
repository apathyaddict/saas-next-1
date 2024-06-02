import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import Message from "@/models/message";
import PDF from "@/models/pdf";
import { connectToDB } from "@/utils/database";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

// export const POST = async (req: NextRequest) => {
//   console.log(req);

//   try {
//     const { message, userId, fileId, createdAt, updatedAt } = await req.json();

//     const { getUser } = getKindeServerSession();
//     const user = getUser();

//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const file = await PDF.findOne({
//       _id: fileId,
//       userId: userId,
//     }).populate("userId");

//     if (!file) {
//       return new Response("Not found", { status: 404 });
//     }

//     const newMessage = await Message.create({
//       message,
//       isUserMessage: true,
//       userId,
//       fileId,
//       createdAt,
//       updatedAt,
//     });

//     return new Response(JSON.stringify(newMessage), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return new Response("fileId query parameter is required", {
        status: 400,
      });
    }

    await connectToDB();

    const prevMessages = await Message.find({ fileId })
      .sort({ createdAt: "asc" })
      .limit(INFINITE_QUERY_LIMIT);

    if (!prevMessages.length) {
      return new Response("No messages found", { status: 404 });
    }

    return new Response(JSON.stringify(prevMessages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching previous messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
