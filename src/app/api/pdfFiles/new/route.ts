import PDF from "../../../../models/pdf";
import { connectToDB } from "../../../../utils/database";

export const POST = async (request) => {
  //add here what to save to file
  const { name, url, key, createdAt, updatedAt } = await request.json();

  try {
    await connectToDB();
    const newPdf = new PDF({ creator: name, url, key, createdAt, updatedAt });

    await newPdf.save();

    return new Response(JSON.stringify(newPdf), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
