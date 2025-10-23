"use client";
import { registerTeam, RegisterTeamFormState } from "@/lib/action";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface RegistrationFormProps {
  competitionId: string;
}

export default function RegistrationForm({
  competitionId,
}: RegistrationFormProps) {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;
  const isLoading = status === "loading";
  const router = useRouter();

  // Get the leader ID from the session
  const leaderId = session?.user.id;
  if (!leaderId) {
    console.error("User is not authenticated.");
    return <></>;
  }

  const registerTeamWithArgs = registerTeam.bind(null, leaderId, competitionId);

  const [state, formAction] = useActionState<RegisterTeamFormState, FormData>(
    registerTeamWithArgs,
    {}
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="max-w-md mx-auto p-4">
      {state.error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Registrasi berhasil! Team ID: {state.teamId}
        </div>
      )}

      {!state.success && (
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="teamName" className="block font-medium">
              Team Name: {`${competitionId}`}
              Leader Name: {`${leaderId}`}
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              required
              className="w-full border rounded p-2"
            />
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : !isLoggedIn ? (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded">
              Please log in to register your team.
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          )}
        </form>
      )}
    </div>
  );
}