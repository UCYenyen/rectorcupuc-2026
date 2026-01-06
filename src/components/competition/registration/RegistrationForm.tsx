// src/components/competition/registration/RegistrationForm.tsx
"use client";
import { registerTeam, RegisterTeamFormState } from "@/lib/action";
import React, { useEffect, useState, startTransition, useCallback } from "react";
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

  // --- States ---
  const [userVerified, setUserVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [networkError, setNetworkError] = useState(false); // <--- NEW: Handle Fetch Failure
  
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
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

  // --- Verification Logic with Retry ---
  const verifyUser = useCallback(async () => {
    if (status === "loading" || !session?.user?.id) return;

    setVerifying(true);
    setNetworkError(false); // Reset error on retry

    try {
      const response = await fetch(`/api/user/verify/${session.user.id}`);
      
      // Handle non-JSON responses (HTML 500 pages, etc)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
         throw new Error("Server returned invalid format");
      }

      const data = await response.json();

      if (data.exists) {
        setUserVerified(true);
      } else {
        // User is connected but not in DB
        setUserVerified(false); 
      }
    } catch (error) {
      console.error("Verification error:", error);
      // This catches "TypeError: Failed to fetch" (Network issues)
      setNetworkError(true);
    } finally {
      setVerifying(false);
    }
  }, [session?.user?.id, status]);

  // Initial load
  useEffect(() => {
    if (status === "authenticated") {
      verifyUser();
    } else if (status === "unauthenticated") {
      setVerifying(false);
    }
  }, [status, verifyUser]);

  // --- Success Redirect ---
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  // --- Upload Logic (Same as before) ---
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

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");
            return data.url;
        } else {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            throw new Error("Invalid response from upload server");
        }
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
    throw new Error("Upload failed");
  }

  async function cleanupUploadedImage(url: string) {
    if (!url) return;
    try {
      await fetch("/api/image/delete", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
    } catch (e) { console.error(e); }
  }

  // --- Submit Handler ---
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setUploadProgress({ instagram: false, profile: false });

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const instagramFile = fd.get("instagramProof") as File;
    const profileFile = fd.get("profileImage") as File;

    if (instagramFile?.size > 5 * 1024 * 1024) return setFormError("Instagram proof > 5MB");
    if (profileFile?.size > 5 * 1024 * 1024) return setFormError("Profile image > 5MB");

    let instagramProofUrl = "";
    let profileImageUrl = "";

    try {
      setUploading(true);
      if (instagramFile?.size > 0) {
        instagramProofUrl = await uploadWithRetry(instagramFile);
        setUploadProgress(prev => ({ ...prev, instagram: true }));
      }
      if (profileFile?.size > 0) {
        try {
          profileImageUrl = await uploadWithRetry(profileFile);
          setUploadProgress(prev => ({ ...prev, profile: true }));
        } catch (error) {
          await cleanupUploadedImage(instagramProofUrl);
          throw error;
        }
      }

      fd.set("instagramProofUrl", instagramProofUrl);
      fd.set("profileImageUrl", profileImageUrl);

      startTransition(() => formAction(fd));
      
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ================= RENDER GUARDS =================

  // 1. Not Logged In
  if (status === "unauthenticated" || (!session && status !== "loading")) {
    return <div className="text-white text-center p-4">Please log in to register</div>;
  }

  // 2. Loading / Verifying
  if (status === "loading" || verifying) {
    return (
      <div className="text-white text-center p-4">
        <div className="animate-pulse">Checking account status...</div>
      </div>
    );
  }

  // 3. Network Error (Failed to Fetch) - NEW UI
  if (networkError) {
    return (
      <div className="text-white text-center space-y-4 p-6 bg-red-950/30 rounded-xl border border-red-800">
        <h3 className="text-xl font-bold text-red-400">Connection Failed</h3>
        <p className="text-sm text-gray-300">
          We couldn't verify your account details. This is likely a network issue.
        </p>
        <button
          onClick={verifyUser}
          className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 4. Invalid User (Logged in, but not in DB)
  if (!userVerified) {
    return (
      <div className="text-white text-center space-y-4 p-4">
        <div className="text-red-400 font-bold bg-red-900/20 p-4 rounded-lg border border-red-500">
           Account verification failed. Please relogin.
        </div>
        <button
          onClick={() => router.push("/api/auth/signout")}
          className="bg-black/40 border-2 border-white hover:bg-purple-800 px-6 py-2 rounded-lg"
        >
          Log Out
        </button>
      </div>
    );
  }

  // 5. Success / Form
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white w-full max-w-lg mx-auto">
      {state.success ? (
        <div className="text-center space-y-4 bg-green-900/20 p-8 rounded-xl border border-green-500">
          <div className="text-green-400 font-bold text-2xl">✓ Registration Successful!</div>
          <p className="text-gray-200">Redirecting...</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl text-white text-center uppercase font-bold mb-4">
            {slug} Registration
          </h2>

          {(state.error || formError) && (
            <div className="bg-red-950/50 border-2 border-red-600 text-red-200 p-4 rounded-lg font-medium text-sm text-center">
               ⚠️ {state.error || formError}
            </div>
          )}

          {/* FORM FIELDS START */}
          <div className="space-y-2 w-full flex flex-col gap-1">
            <label htmlFor="teamName" className="font-bold text-sm uppercase tracking-wider">
              {isSolo ? "Your Name" : "Team Name"}
            </label>
            <input type="text" id="teamName" name="teamName" required disabled={uploading}
              className="w-full border-2 border-white/20 rounded-lg p-3 bg-black/40 backdrop-blur-xl outline-none focus:border-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1">
            <label htmlFor="nim" className="font-bold text-sm uppercase tracking-wider">NIM</label>
            <input type="text" id="nim" name="nim" required disabled={uploading}
              className="w-full border-2 border-white/20 rounded-lg p-3 bg-black/40 backdrop-blur-xl outline-none focus:border-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1">
            <label htmlFor="faculty" className="font-bold text-sm uppercase tracking-wider">Faculty</label>
            <select id="faculty" name="faculty" required disabled={uploading}
              className="w-full border-2 border-white/20 rounded-lg p-3 bg-black/60 backdrop-blur-xl outline-none text-white focus:border-purple-500 disabled:opacity-50"
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

          <div className="space-y-2 w-full flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider flex justify-between">
              <span>Rector's IG Proof</span> {uploadProgress.instagram && <span className="text-green-400">✓</span>}
            </label>
            <input type="file" name="instagramProof" accept="image/*" required disabled={uploading}
              className="w-full border-2 border-white/20 rounded-lg p-2 bg-black/40 backdrop-blur-xl file:bg-purple-600 file:text-white file:border-0 file:rounded-full file:px-4 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider flex justify-between">
              <span>Selfie</span> {uploadProgress.profile && <span className="text-green-400">✓</span>}
            </label>
            <input type="file" name="profileImage" accept="image/*" required disabled={uploading}
              className="w-full border-2 border-white/20 rounded-lg p-2 bg-black/40 backdrop-blur-xl file:bg-purple-600 file:text-white file:border-0 file:rounded-full file:px-4 disabled:opacity-50"
            />
          </div>
          {/* FORM FIELDS END */}

          {uploading && (
            <div className="text-purple-200 text-sm font-bold animate-pulse text-center">
              Uploading... {uploadProgress.instagram && uploadProgress.profile ? "(2/2)" : "(1/2)"}
            </div>
          )}

          <button type="submit" disabled={uploading}
            className="mt-4 bg-white text-black border-2 border-white py-3 px-4 w-full rounded-xl uppercase font-black hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all disabled:opacity-50"
          >
            {uploading ? "Processing..." : "Register"}
          </button>
        </>
      )}
    </form>
  );
}