import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  //change here for file type
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = getUser();

      if (!user || user.id) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //send to databse

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
