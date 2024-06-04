import PDF from "../../../models/pdf";
import { connectToDB } from "../../../utils/database";

export const revalidate = 0;

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const pdfs = await PDF.find({}).populate("userId");

    return new Response(JSON.stringify(pdfs), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
