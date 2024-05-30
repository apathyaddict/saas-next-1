import PDF from "@/models/pdf";
import { connectToDB } from "@/utils/database";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectToDB();

    const pdf = await PDF.findById(params.id).populate("createdAt");
    console.log("pdf", pdf);
    if (!pdf) return new Response("File Not Found", { status: 404 });

    return new Response(JSON.stringify(pdf), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
