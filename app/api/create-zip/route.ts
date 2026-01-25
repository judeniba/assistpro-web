import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { files, filename = "archive.zip" } = body;

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        { error: "Invalid request. 'files' array is required." },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    // Add each file to the zip
    files.forEach((file: { name: string; content: string }) => {
      zip.file(file.name, file.content);
    });

    // Generate the zip file as a blob
    const zipBlob = await zip.generateAsync({ type: "blob" });
    
    // Convert blob to buffer for NextResponse
    const arrayBuffer = await zipBlob.arrayBuffer();

    // Return the zip file as a download
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error creating zip:", error);
    return NextResponse.json(
      { error: "Failed to create zip file" },
      { status: 500 }
    );
  }
}
