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
  const { id, message, userId } = await request.json();

  console.log(id);
  try {
    await connectToDB();

    const updatedPdf = await PDF.findByIdAndUpdate(
      id,
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

    if (!updatedPdf) {
      return new Response("PDF not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedPdf), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error updating PDF", { status: 500 });
  }
};
