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
  { params }: { params: Params },
) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await PDF.findOneAndDelete({ string: params.id });

    return new Response("pdf deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting pdf", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params },
) => {
  const { fileId, message, userId } = await request.json();

  try {
    await connectToDB();

    // Find the existing PDF by ID

    const existingPdf = await PDF.findByIdAndUpdate(
      fileId,
      {
        $push: {
          messages: {
            message,
            userId,
            isUserMessage: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!existingPdf) {
      return new Response("PDF not found", { status: 404 });
    }

    return new Response("Successfully updated the PDF", { status: 200 });
  } catch (error) {
    return new Response("Error updating PDF", { status: 500 });
  }
};
