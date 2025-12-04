import React from "react";

interface CompetitionRulesProps {
  rules: string[];
}

export default function CompetitionRules({ rules }: CompetitionRulesProps) {
  return (
    <div className="border-4 border-[#AAF3D5] flex flex-col rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
        <h3 className="text-white font-bold uppercase">Rules and Guidelines</h3>
      </div>
      <div className="bg-[#390D62]/60 p-6 h-full flex flex-col justify-between gap-4">
        <ul className="text-white space-y-3">
          {rules.map((rule, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-[#AAF3D5]">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="w-full bg-white/90 hover:bg-white text-[#390D62] font-bold py-3 rounded-lg uppercase transition-all duration-200">
            Register
          </button>
          {/* Download Button */}
          <button className="w-full bg-white/90 hover:bg-white text-[#390D62] font-bold py-3 rounded-lg uppercase transition-all duration-200">
            Download Guidebook.pdf
          </button>
        </div>
      </div>
    </div>
  );
}
