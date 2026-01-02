import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Extract filename from URL (e.g., "/uploads/1234567890.webp" -> "1234567890.webp")
    const fileName = url.split("/").pop();
    
    if (!fileName) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Construct file path
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // Delete the file
    await unlink(filePath);

    return NextResponse.json({ 
      success: true, 
      message: "Image deleted successfully" 
    });
  } catch (error: any) {
    // Handle file not found error
    if (error.code === "ENOENT") {
      return NextResponse.json({ 
        error: "File not found" 
      }, { status: 404 });
    }

    console.error("Delete error:", error);
    return NextResponse.json({ 
      error: "Failed to delete image" 
    }, { status: 500 });
  }
}