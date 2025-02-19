"use client";
import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CLIENT_ID =
  "723297942068-76ia2of9j52a68a3saab68gs19eggpgp.apps.googleusercontent.com"; // Replace with your actual Client ID

export default function BackupToGoogleDrive() {

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;

      // Fetch the file from the server if available
      await fetchFileAndUploadToDrive(accessToken);
    },
    scope: "https://www.googleapis.com/auth/drive.file",
  });

  const fetchFileAndUploadToDrive = async (accessToken: string) => {
    try {
      // Fetch the file from the server-side API route
      const res = await fetch("/api/getFile");
      const blob = await res.blob();

      const metadata = {
        name: "arab-Clinic.db", // Name of the file in Google Drive
        mimeType: "application/x-sqlite3",
      };

      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", blob);

      const response = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        form,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Backup successful! File ID: " + response.data.id);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to back up the database.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <button
        onClick={() => login()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Backup Database to Google Drive
      </button>
    </GoogleOAuthProvider>
  );
}
