import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// Re-initialize S3 Client locally to avoid circular deps or just for clarity. 
// Can import from @/lib/s3 but let's keep it self-contained or import `s3Client` if exported.
// Since `s3.ts` exports `uploadFile` and not client by default (it's not exported), we re-init.
// Actually, it's better to export s3Client from lib/s3.ts to DRY.
// For now, I'll duplicate the config to be safe and independent.

const accessKeyId = (process.env.S3_ACCESS_KEY || "").trim();
const secretAccessKey = (process.env.S3_SECRET_KEY || "").trim();
const endpoint = (process.env.S3_ENDPOINT || "").trim();
const region = (process.env.S3_REGION || "us-east-1").trim();
const bucketName = (process.env.S3_BUCKET_NAME || "").trim();

const s3Client = new S3Client({
    region,
    endpoint,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    forcePathStyle: false, // Railway default usually
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get("key");

    if (!key) {
        return new NextResponse("Key required", { status: 400 });
    }

    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const response = await s3Client.send(command);

        if (!response.Body) {
            return new NextResponse("Not found", { status: 404 });
        }

        // Convert the stream to a Web ReadableStream
        // Node.js Readable from AWS SDK to Web ReadableStream for Next.js
        const stream = response.Body as unknown as Readable;

        // Set headers
        const headers = new Headers();
        if (response.ContentType) {
            headers.set("Content-Type", response.ContentType);
        }
        if (response.ContentLength) {
            headers.set("Content-Length", response.ContentLength.toString());
        }
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        // Return the stream
        // @ts-ignore: Next.js supports Node streams depending on version/runtime, 
        // but standard Response expects Web Stream. 
        // AWS SDK V3 returns a Node stream (IncomingMessage) in Node env.
        // We can use `NextResponse` with the body directly in many cases.

        // Quick fix for stream compatibility:
        const webStream = new ReadableStream({
            start(controller) {
                stream.on("data", (chunk) => controller.enqueue(chunk));
                stream.on("end", () => controller.close());
                stream.on("error", (err) => controller.error(err));
            },
        });

        return new NextResponse(webStream, { headers });

    } catch (error: any) {
        console.error("Image Proxy Error:", error);
        if (error.Code === "NoSuchKey") {
            return new NextResponse("Image not found", { status: 404 });
        }
        return new NextResponse("Error fetching image", { status: 500 });
    }
}
