# Zip Folder Creation Feature

This project includes functionality to create and download zip files on the client side.

## Features

- **Client-side zip creation**: Create zip files in the browser using JSZip
- **Server-side zip API**: API endpoint for creating zip files on the server
- **Download component**: Ready-to-use React component for downloading zip packages

## Usage

### Client-Side Zip Creation

```typescript
import { createAndDownloadZip } from "../lib/zipUtils";

const files = [
  { name: "file1.txt", content: "File content here" },
  { name: "file2.json", content: JSON.stringify({ key: "value" }) }
];

await createAndDownloadZip(files, "my-archive.zip");
```

### Using the ZipDownloader Component

```typescript
import ZipDownloader from "../components/ZipDownloader";

// In your component
<ZipDownloader />
```

### API Endpoint

POST `/api/create-zip`

Request body:
```json
{
  "files": [
    { "name": "file1.txt", "content": "content here" }
  ],
  "filename": "archive.zip"
}
```

## Dependencies

- `jszip`: ^3.10.1 - Library for creating zip files

## Files Created

- `lib/zipUtils.ts` - Utility functions for creating zip files
- `app/api/create-zip/route.ts` - API endpoint for server-side zip creation
- `components/ZipDownloader.tsx` - React component with zip download functionality
