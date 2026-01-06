// src/components/competition/registration/RegistrationForm.tsx
"use client";
import { registerTeam, RegisterTeamFormState } from "@/lib/action";
import React, { useEffect, useState, startTransition } from "react";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegistrationFormProps {
  slug: string;
  isSolo?: boolean;
}

export default function RegistrationForm({
  slug,
  isSolo = false,
}: RegistrationFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [userVerified, setUserVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    instagram: boolean;
    profile: boolean;
  }>({ instagram: false, profile: false });

  const leaderId = session?.user?.id || "";
  const registerTeamWithArgs = registerTeam.bind(null, leaderId, slug);
  const [state, formAction] = useActionState<RegisterTeamFormState, FormData>(
    registerTeamWithArgs,
    {}
  );

  useEffect(() => {
    async function verifyUser() {
      if (status === "loading") return;

      if (!session?.user?.id) {
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/verify/${session.user.id}`);
        const data = await response.json();

        if (data.exists) {
          setUserVerified(true);
        } else {
          console.error("User not found in database");
        }
      } catch (error) {
        console.error("Verification error:", error);
      } finally {
        setVerifying(false);
      }
    }

    verifyUser();
  }, [session?.user?.id, status]);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  const isLoggedIn = !!session;
  const isLoading = status === "authenticated" ? false : status === "loading";

  async function uploadWithRetry(file: File, maxRetries = 2): Promise<string> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();
        return data.url;
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
    throw new Error("Upload failed after retries");
  }

  async function cleanupUploadedImage(url: string) {
    try {
      await fetch("/api/image/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch (error) {
      console.error("Failed to cleanup image:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError(null);
    setUploadProgress({ instagram: false, profile: false });

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const instagramFile = fd.get("instagramProof") as File | null;
    const profileFile = fd.get("profileImage") as File | null;

    if (instagramFile && instagramFile.size > 5 * 1024 * 1024) {
      setUploadError("Instagram proof must be less than 5MB");
      return;
    }
    if (profileFile && profileFile.size > 5 * 1024 * 1024) {
      setUploadError("Profile image must be less than 5MB");
      return;
    }

    let instagramProofUrl = "";
    let profileImageUrl = "";

    try {
      setUploading(true);

      if (instagramFile && instagramFile.size > 0) {
        instagramProofUrl = await uploadWithRetry(instagramFile);
        setUploadProgress(prev => ({ ...prev, instagram: true }));
      }

      if (profileFile && profileFile.size > 0) {
        try {
          profileImageUrl = await uploadWithRetry(profileFile);
          setUploadProgress(prev => ({ ...prev, profile: true }));
        } catch (error) {
          if (instagramProofUrl) {
            await cleanupUploadedImage(instagramProofUrl);
          }
          throw error;
        }
      }

      fd.set("instagramProofUrl", instagramProofUrl);
      fd.set("profileImageUrl", profileImageUrl);

      startTransition(() => {
        formAction(fd);
      });
      
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(
        error instanceof Error
          ? error.message
          : "Failed to upload images. Please try again."
      );
      setUploading(false);
    }
  }

  if (!session || !session.user) {
    return (
      <div className="text-white text-center">
        Please log in to register
      </div>
    );
  }

  if (verifying) {
    return (
      <div className="text-white text-center">
        <div className="animate-pulse">Verifying account...</div>
      </div>
    );
  }

  if (!userVerified) {
    return (
      <div className="text-white text-center space-y-4">
        <div className="text-white font-bold">
          Account login session is not valid.
        </div>
        <p className="text-sm">
          Please log out and log in again
        </p>
        <button
          onClick={() => router.push("/api/auth/signout")}
          className="bg-black/40 border-3 hover:bg-purple-800 px-4 py-2 rounded-lg"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-white"
    >
      {state.success ? (
        <div className="text-center space-y-4">
          <div className="text-green-600 font-bold text-2xl">✓ Registration Successful!</div>
          <p className="text-white">Redirecting to dashboard...</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl text-white text-center uppercase font-bold">
            {slug} Registration
          </h2>

          {state.error && (
            <div className="bg-red-100 border-2 border-red-600 text-red-600 p-3 rounded font-bold text-sm">
              {state.error}
            </div>
          )}

          {uploadError && (
            <div className="bg-red-100 border-2 border-red-600 text-red-600 p-3 rounded font-bold text-sm">
              {uploadError}
            </div>
          )}

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="teamName" className="block text-start w-full font-bold">
              {isSolo ? "Your Name" : "Team Name"}
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              required
              disabled={uploading}
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="nim" className="block text-start w-full font-bold">
              NIM (Student ID Number)
            </label>
            <input
              type="text"
              id="nim"
              name="nim"
              required
              disabled={uploading}
              placeholder="e.g., 0123456789"
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="faculty" className="block text-start w-full font-bold">
              FACULTY
            </label>
            <select
              id="faculty"
              name="faculty"
              required
              disabled={uploading}
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none text-white focus:ring-2 focus:ring-[#AAF3D5] disabled:opacity-50"
            >
              <option value="">Select Faculty</option>
              <option value="SBM">SBM</option>
              <option value="SCI">SCI</option>
              <option value="SOT">SOT</option>
              <option value="SIFT">SIFT</option>
              <option value="SOM">SOM</option>
              <option value="SOP">SOP</option>
              <option value="SOC">SOC</option>
            </select>
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="instagramProof" className="block text-start w-full font-bold">
              Screenshot Follow Rector's Instagram {uploadProgress.instagram && "✓"}
            </label>
            <input
              type="file"
              id="instagramProof"
              name="instagramProof"
              accept="image/*"
              required
              disabled={uploading}
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="profileImage" className="block text-start w-full font-bold">
              Selfie Image {uploadProgress.profile && "✓"}
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              required
              disabled={uploading}
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none disabled:opacity-50"
            />
          </div>

          {uploading && (
            <div className="text-purple-400 font-bold animate-pulse text-sm text-center">
              Uploading images... Please wait
              {uploadProgress.instagram && !uploadProgress.profile && " (1/2)"}
              {uploadProgress.instagram && uploadProgress.profile && " (2/2)"}
            </div>
          )}

          {isLoading ? (
            <div className="text-center font-bold">Loading...</div>
          ) : !isLoggedIn ? (
            <div className="bg-yellow-100 border-2 border-yellow-600 text-yellow-700 p-3 rounded font-bold text-sm">
              Please log in to register your team.
            </div>
          ) : (
            <button
              type="submit"
              disabled={uploading || isLoading}
              className="bg-black/40 border-white border-3 text-white py-3 px-4 w-full rounded-xl uppercase font-black hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Register"}
            </button>
          )}
        </>
      )}
    </form>
  );
}