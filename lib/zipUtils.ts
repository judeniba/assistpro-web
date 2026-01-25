import JSZip from "jszip";

/**
 * Create a zip file from an array of files
 * @param files - Array of files with name and content
 * @returns Promise<Blob> - The zip file as a blob
 */
export async function createZipFile(
  files: Array<{ name: string; content: string | Blob }>
): Promise<Blob> {
  const zip = new JSZip();

  // Add each file to the zip
  files.forEach((file) => {
    zip.file(file.name, file.content);
  });

  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}

/**
 * Download a zip file to the user's device
 * @param zipBlob - The zip file as a blob
 * @param filename - The name of the zip file
 */
export function downloadZip(zipBlob: Blob, filename: string = "download.zip") {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('downloadZip can only be called in a browser environment');
  }
  
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Create and download a zip file in one step
 * @param files - Array of files with name and content
 * @param filename - The name of the zip file
 */
export async function createAndDownloadZip(
  files: Array<{ name: string; content: string | Blob }>,
  filename: string = "download.zip"
) {
  const zipBlob = await createZipFile(files);
  downloadZip(zipBlob, filename);
}
