"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); 

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          alert("Upload successful: " + result.name);
        } else {
          alert("Upload failed");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      {file && <p>Selected file: {file}</p>}
    </div>
  );
}
