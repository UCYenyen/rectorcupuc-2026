'use server'
import RegistrationForm from "@/components/competition/registration/RegistrationForm";
import Image from "next/image";

interface ProblemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: ProblemPageProps) {

  const { slug } = await params;
  // Get the current session to access user information

  // Pass both competitionId and leaderId to the form
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <Image
        src={"/home/background.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc background"
        className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
      ></Image>
      <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <RegistrationForm
          slug={slug}
        />
      </div>
    </div>
  );
}