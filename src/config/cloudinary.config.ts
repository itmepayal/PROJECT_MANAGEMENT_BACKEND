import { serverConfig } from ".";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME,
  api_key: serverConfig.CLOUDINARY_API_KEY,
  api_secret: serverConfig.CLOUDINARY_API_SECRET,
});

type ResourceType = "image" | "video" | "raw" | "auto";

export const uploadToCloudinary = async (
  filePath: string,
  folder = "gravity",
  resourceType: ResourceType = "auto",
) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: resourceType,
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    bytes: result.bytes,
  };
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: ResourceType = "image",
) => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};
