import { CloudinaryUploadResponse } from "@/types/type";
import imageCompression from "browser-image-compression";

export const uploadToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResponse> => {
  // 🔹 Compress image
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1, // <= 1MB
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  });

  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    console.error("Cloudinary Error:", error);
    throw new Error("Cloudinary upload failed");
  }

  const data: CloudinaryUploadResponse = await res.json();
  return data;
};
