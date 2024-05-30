import PDF from "../../../../models/pdf";
import connectDB from "../../../../utils/database";

export const POST = async (request) => {
  //add here what to save to file
  const {} = await request.json();

  try {
    await connectDB();
    const newPdf = new PDF({ creator: userId, prompt, tag });

    await newPdf.save();

    return new Response(JSON.stringify(newPdf), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
