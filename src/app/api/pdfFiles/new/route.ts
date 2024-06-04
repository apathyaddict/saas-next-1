import { NextRequest } from "next/server";
import PDF from "../../../../models/pdf";
import { connectToDB } from "../../../../utils/database";

export const revalidate = 0;

export const POST = async (request: NextRequest) => {
  //add here what to save to file
  const { name, url, key, createdAt, updatedAt, uploadStatus, messages } =
    await request.json();

  try {
    await connectToDB();
    const newPdf = new PDF({
      name,
      url,
      key,
      createdAt,
      updatedAt,
      uploadStatus,
      messages,
    });

    await newPdf.save();

    return new Response(JSON.stringify(newPdf), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
