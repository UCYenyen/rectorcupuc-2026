"use client";
import { registerTeam, RegisterTeamFormState } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegistrationFormProps {
  slug: string;
}

export default function RegistrationForm({
  slug,
}: RegistrationFormProps) {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;
  const isLoading = status === "loading";
  const router = useRouter();
  const leaderId = session?.user?.id ?? "";
  const registerTeamWithArgs = registerTeam.bind(null, leaderId, slug);
  const [state, formAction] = useActionState<RegisterTeamFormState, FormData>(
    registerTeamWithArgs,
    {}
  );

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const file = fd.get("instagramProof") as File | null;

    let imageUrl = "";

    if (file && file instanceof File) {
      try {
        setUploading(true);
        const uploadFd = new FormData();
        uploadFd.append("file", file);

        const res = await fetch("/api/image/upload", {
          method: "POST",
          body: uploadFd,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Upload failed");
        imageUrl = json.url;
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : String(err));
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    // Kirim ke server action (registerTeam) sebagai FormData
    const submitFd = new FormData();
    submitFd.append("teamName", String(fd.get("teamName") ?? ""));
    if (imageUrl) submitFd.append("instagramProofUrl", imageUrl);

    // Jalankan pemanggilan action di dalam transition agar isPending ter-update
    React.startTransition(() => {
      void formAction(submitFd);
    });
  }

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-start w-full gap-8 text-white">
      <h1 className="text-2xl md:text-4xl font-bold w-full text-center">REGISTRATION</h1>
      {state.error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 w-full text-center">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4 w-full text-center">
          Registration Success!
        </div>
      )}

      {!state.success && (
        <form onSubmit={handleSubmit} className="space-y-4 w-full justify-center items-start flex flex-col gap-2">
          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="teamName" className="block text-start w-full font-bold">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Upload Instagram Proof */}
          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="instagramProof" className="block text-start w-full font-bold">
              Screenshot Follow Rector's Instagram
            </label>
            <input
              type="file"
              id="instagramProof"
              name="instagramProof"
              accept="image/*"
              required
              className="w-full border rounded p-2"
            />
          </div>

          {uploadError && <div className="text-red-600">{uploadError}</div>}
          {uploading && <div>Uploading image...</div>}
          
          {isLoading ? (
            <div>Loading...</div>
          ) : !isLoggedIn ? (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded">
              Please log in to register your team.
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black/40 border-white border-3 text-white py-2 px-4 w-full rounded-lg uppercase font-bold"
            >
              Register
            </button>
          )}
        </form>
      )}
    </div>
  );
}