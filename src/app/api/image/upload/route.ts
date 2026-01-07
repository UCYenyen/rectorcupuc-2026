// src/app/api/image/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let webpBuffer: Buffer;
    try {
      webpBuffer = await sharp(buffer, { failOn: 'none' }) 
        .rotate() 
        .webp({ quality: 80 })
        .resize({ 
          width: 1920, 
          height: 1920, 
          fit: "inside", 
          withoutEnlargement: true 
        })
        .toBuffer();
    } catch (sharpError) {
      console.error("Sharp processing error:", sharpError);
      return NextResponse.json(
        { error: "Image file is corrupted or invalid" },
        { status: 422 } // Gunakan 422 untuk data yang tidak bisa diproses
      );
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, fileName);
    await writeFile(uploadPath, webpBuffer);

    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      size: webpBuffer.length 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Upload failed",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}