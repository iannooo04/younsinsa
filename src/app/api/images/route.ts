import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { s3Client, bucketName } from "@/lib/s3";

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
