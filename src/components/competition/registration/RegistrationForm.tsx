"use client";
import { registerTeam, RegisterTeamFormState } from "@/lib/action";
import React, { useEffect, useState } from "react";
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
  
  const isLoggedIn = !!session;
  const isLoading = status === "loading";
  const router = useRouter();
  if(!session || !session.user){
    return null;
  }

  console.log("RegistrationForm session:", session);
  console.log("RegistrationForm user_id:", session.user.id);

  const leaderId = session.user.id;
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

    const instagramFile = fd.get("instagramProof") as File | null;
    const profileFile = fd.get("profileImage") as File | null;

    try {
      setUploading(true);

      let instagramProofUrl = "";
      let profileImageUrl = "";

      if (instagramFile && instagramFile.size > 0) {
        const f1 = new FormData();
        f1.append("file", instagramFile);
        const res1 = await fetch("/api/image/upload", { method: "POST", body: f1 });
        const json1 = await res1.json();
        if (!res1.ok) throw new Error(json1.error || "Gagal upload bukti instagram");
        instagramProofUrl = json1.url;
      }
      if (profileFile && profileFile.size > 0) {
        const f2 = new FormData();
        f2.append("file", profileFile);
        const res2 = await fetch("/api/image/upload", { method: "POST", body: f2 });
        const json2 = await res2.json();
        if (!res2.ok) throw new Error(json2.error || "Gagal upload foto profil");
        profileImageUrl = json2.url;
      }

      fd.set("instagramProofUrl", instagramProofUrl);
      fd.set("profileImageUrl", profileImageUrl);

      formAction(fd);
    } catch {
      setUploadError("Failed to upload images");
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-white"
    >
      {state.success ? (
        <div className="text-green-600 font-bold">Registration Successful!</div>
      ) : (
        <>
          <h2 className="text-3xl text-white text-center uppercase font-bold">
            {slug} Registeration
          </h2>

          {state.error && (
            <div className="bg-red-100 border-2 border-red-600 text-red-600 p-3 rounded font-bold text-sm">
              {state.error}
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
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none"
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
              placeholder="e.g., 0123456789"
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none"
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
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none text-white focus:ring-2 focus:ring-[#AAF3D5]"
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
              Screenshot Follow Rector's Instagram
            </label>
            <input
              type="file"
              id="instagramProof"
              name="instagramProof"
              accept="image/*"
              required
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl"
            />
          </div>

          <div className="space-y-2 w-full flex flex-col gap-1 items-center justify-center">
            <label htmlFor="profileImage" className="block text-start w-full font-bold">
              Selfie Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              required
              className="w-full border-2 rounded p-2 bg-black/40 backdrop-blur-2xl outline-none"
            />
          </div>

          {uploadError && <div className="text-red-600 font-bold text-sm">{uploadError}</div>}
          {uploading && <div className="text-purple-600 font-bold animate-pulse text-sm">Uploading images...</div>}

          {isLoading ? (
            <div className="text-center font-bold">Loading...</div>
          ) : !isLoggedIn ? (
            <div className="bg-yellow-100 border-2 border-yellow-600 text-yellow-700 p-3 rounded font-bold text-sm">
              Please log in to register your team.
            </div>
          ) : (
            <button
              type="submit"
              disabled={uploading}
              className="bg-black/40 border-white border-3 text-white py-3 px-4 w-full rounded-xl uppercase font-black hover:bg-purple-700 transition-colors disabled:bg-gray-400"
            >
              {uploading ? "Processing..." : "Register"}
            </button>
          )}
        </>
      )}
    </form>
  );
}