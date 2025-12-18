import { getAllRegistrations } from '@/lib/competition';
import RegistrationTable from '@/components/dashboard/admin/RegistrationTable';
import Image from 'next/image';
export default async function RegistrationPage() {
  const registrations = await getAllRegistrations();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-center justify-center p-4">
      <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
      <Image
        src={"/home/background.svg"}
        width={1000}
        height={1000}
        alt="rectorcupuc background"
        draggable={false}
        className="w-full h-full object-center object-cover opacity-25 z-1 absolute"
      ></Image>
      <div className="relative z-10 border-[#AAF3D5] border-4 bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center w-[90%]">
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">Competition Registrations</h1>
        <RegistrationTable registrations={registrations} />
      </div>
    </div>
  );
}
