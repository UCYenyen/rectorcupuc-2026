'use server'
import React from "react";
import RegistrationForm from "@/components/competition/registration/RegistrationForm";


export default async function Page({ params }: { params: { id: string } }) {

  const id = await params.id;
  // Get the current session to access user information
  
  // Pass both competitionId and leaderId to the form
  return (
    <div className="bg-zinc-300">
    <RegistrationForm 
      competitionId={id} 
    />
  </div>
  );
}