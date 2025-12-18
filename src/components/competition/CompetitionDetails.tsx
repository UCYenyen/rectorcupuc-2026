import React from 'react';

interface CompetitionDetailsProps {
  location: string;
}

export default function CompetitionDetails({
  location,
}: CompetitionDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Venue Section */}
      <div className="border-4 border-[#AAF3D5] rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
          <h3 className="text-white font-bold uppercase">Venue</h3>
        </div>
        <div className="bg-[#390D62]/60 p-4">
          <p className="text-white">{location}</p>
        </div>
      </div>
    </div>
  );
}