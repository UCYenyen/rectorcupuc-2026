import React from 'react';

interface CompetitionDetailsProps {
  participants: string;
  format: string;
  venue: string;
  prizePool: string;
}

export default function CompetitionDetails({
  participants,
  format,
  venue,
  prizePool
}: CompetitionDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Participants Section */}
      <div className="border-4 border-[#AAF3D5] rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
          <h3 className="text-white font-bold uppercase">Participants</h3>
        </div>
        <div className="bg-[#390D62]/60 p-4">
          <p className="text-white">{participants}</p>
        </div>
      </div>

      {/* Format Section */}
      <div className="border-4 border-[#AAF3D5] rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
          <h3 className="text-white font-bold uppercase">Format</h3>
        </div>
        <div className="bg-[#390D62]/60 p-4">
          <p className="text-white">{format}</p>
        </div>
      </div>

      {/* Venue Section */}
      <div className="border-4 border-[#AAF3D5] rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
          <h3 className="text-white font-bold uppercase">Venue</h3>
        </div>
        <div className="bg-[#390D62]/60 p-4">
          <p className="text-white">{venue}</p>
        </div>
      </div>

      {/* Prize Pool Section */}
      <div className="border-4 border-[#AAF3D5] rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
          <h3 className="text-white font-bold uppercase">Prize Pool</h3>
        </div>
        <div className="bg-[#390D62]/60 p-4">
          <p className="text-white">{prizePool}</p>
        </div>
      </div>
    </div>
  );
}