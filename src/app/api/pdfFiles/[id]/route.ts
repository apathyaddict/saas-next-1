import PDF from "@/models/pdf";
import { connectToDB } from "@/utils/database";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectToDB();

    const pdf = await PDF.findById(params.id).populate("createdAt");

    if (!pdf) return new Response("File Not Found", { status: 404 });

    return new Response(JSON.stringify(pdf), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await PDF.findOneAndDelete(params.id);

    return new Response("pdf deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting pdf", { status: 500 });
  }
};
