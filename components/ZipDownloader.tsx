"use client";

import { useState } from "react";
import { createAndDownloadZip } from "../lib/zipUtils";

export default function ZipDownloader() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateZip = async () => {
    setIsCreating(true);
    setError(null);
    try {
      // Example files to include in the zip
      const files = [
        {
          name: "readme.txt",
          content: "Welcome to AssistPro! This is a sample zip archive.",
        },
        {
          name: "info.txt",
          content: `AssistPro Information
          
Verified Elite Professionals
- Personal Assistants
- Drivers (Client Vehicle)
- Chaperones (Male)
- Hostesses (Female)
- Artists

Contact: seaointeralia@gmail.com`,
        },
        {
          name: "services.json",
          content: JSON.stringify(
            {
              services: [
                "Personal Assistants",
                "Drivers",
                "Chaperones",
                "Hostesses",
                "Artists",
              ],
              features: [
                "Admin-approved verification",
                "Discretion-first standards",
                "Global multilingual service",
              ],
            },
            null,
            2
          ),
        },
      ];

      await createAndDownloadZip(files, "assistpro-info.zip");
    } catch (error) {
      console.error("Error creating zip:", error);
      setError("Failed to create zip file. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleCreateZip}
        disabled={isCreating}
        className="btn btnPrimary"
        style={{
          opacity: isCreating ? 0.6 : 1,
          cursor: isCreating ? "not-allowed" : "pointer",
        }}
      >
        <span className="goldHover">
          {isCreating ? "Creating Zip..." : "Download Info Package"}
        </span>
      </button>
      {error && (
        <div style={{ 
          marginTop: 8, 
          color: '#ff6b6b', 
          fontSize: 12,
          fontWeight: 600 
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
