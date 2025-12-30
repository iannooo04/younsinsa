import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const accessKeyId = (process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || "").trim();
const secretAccessKey = (process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || "").trim();
const endpoint = (process.env.AWS_ENDPOINT_URL || process.env.S3_ENDPOINT || "").trim();
const bucketName = (process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME || "").trim();
const region = (process.env.AWS_DEFAULT_REGION || process.env.S3_REGION || "us-east-1").trim();

const s3Client = new S3Client({
  region: region,
  endpoint: endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: false,
});

export async function uploadFile(file: Buffer, filename: string, contentType: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is not defined");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: filename,
    Body: file,
    ContentType: contentType,
    // ACL: "public-read", // Not needed for Proxy method
  });

  await s3Client.send(command);

  // Return Proxy URL
  // Format: /api/images?key=filename
  // We use encodeURIComponent to ensure the key is safe (though filename is usually safe)
  return `/api/images?key=${encodeURIComponent(filename)}`;
}

export async function deleteFile(fileUrl: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  if (!bucketName) return;

  try {
    // Check if it's a proxy URL or legacy absolute URL
    let key = "";
    if (fileUrl.includes("/api/images")) {
      // Parse from query param
      // e.g. /api/images?key=categories%2F...
      const urlObj = new URL(fileUrl, "http://dummy.com"); // Base needed for relative URLs
      key = urlObj.searchParams.get("key") || "";
    } else {
      // Fallback for legacy URLs (absolute S3 URLs)
      const urlObj = new URL(fileUrl);
      key = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
    }

    if (!key) return;

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
  }
}

export async function listFiles() {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;
  if (!bucketName) return [];

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    const response = await s3Client.send(command);

    return (response.Contents || []).map((item) => ({
      key: item.Key || "",
      size: item.Size || 0,
      lastModified: item.LastModified ? item.LastModified.toISOString() : "",
      url: `/api/images?key=${encodeURIComponent(item.Key || "")}`,
    }));
  } catch (error) {
    console.error("Error listing files from S3:", error);
    return [];
  }
}
