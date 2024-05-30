import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { connectToDB } from "@/utils/database";

const f = createUploadthing();

export const ourFileRouter = {
  // Change here for file type
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectToDB();

      // const createdFile = await db.create("/api/pdfFiles/new", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     name: file.name,
      //     userId: metadata.userId, // Use metadata.userId here
      //     key: file.key,
      //     url: file.url,
      //   }),
      // });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
