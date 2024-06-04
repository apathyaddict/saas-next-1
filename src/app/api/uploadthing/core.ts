import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { connectToDB } from "@/utils/database";
import PDF from "@/models/pdf";

const f = createUploadthing();

export const revalidate = 0;

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      if (!user || !user.id) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await connectToDB();

      try {
        const newPdf = new PDF({
          key: file.key,
          filename: file.name,
          url: file.url,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: metadata.userId,
          uploadStatus: "PROCESSING",
        });

        await newPdf.save();

        console.log("File saved successfully:", newPdf);
        return { uploadedBy: metadata.userId, fileId: newPdf._id };
      } catch (error) {
        console.error("Failed to save file:", error);
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
