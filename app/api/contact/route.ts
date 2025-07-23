import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const timestamp = new Date().toISOString();
    const filename = `contact-${timestamp}.json`;

    // Guardar el registro como archivo JSON en Blob
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 