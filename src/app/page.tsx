import CountdownContainer from "@/components/CountdownContainer";

export default function Home() {
  // contoh: set akhir pada 1 Jan 2026 UTC
  return (
    <div className="min-h-screen w-scren overflow-hidden bg-zinc-300 flex flex-col justify-center items-center">
      <h1 className="text-9xl text-black font-bold text-center">RECTORCUP 2026</h1>
      <CountdownContainer endDate="2026-01-01T00:00:00Z" />
    </div>
  );
}
