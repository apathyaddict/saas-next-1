import { createRouteHandler } from "uploadthing/next"; // Importing createRouteHandler from uploadthing/next
import { ourFileRouter } from "./core"; // Importing ourFileRouter from ./core
import { UTApi } from "uploadthing/server";

export const revalidate = 0;

// Exporting GET and POST route handlers created using createRouteHandler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Optional custom config can be applied here
  // config: { ... },
});

// Exporting a DELETE route handler
export async function DELETE(request: Request) {
  const data = await request.json();
  console.log("HERE data", data);
  console.log("HERE EVE", data.files);
  const newUrl = data.files;

  const utapi = new UTApi();
  await utapi.deleteFiles(newUrl);
  return Response.json({ message: "ok" });
}
