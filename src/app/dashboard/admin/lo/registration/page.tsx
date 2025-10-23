import { getAllRegistrations } from '@/lib/competition';
import RegistrationTable from '@/components/dashboard/admin/RegistrationTable';

export default async function RegistrationPage() {
  const registrations = await getAllRegistrations();
  
  return (
    <div className="p-6 bg-zinc-400 min-h-screen">
      <h1 className="text-2xl text-black font-bold mb-6">Competition Registrations</h1>
      <RegistrationTable registrations={registrations} />
    </div>
  );
}
