import React from "react";
import { CompetitionRulesModel } from "@/types/competition.md";
import Link from "next/link";

export default function CompetitionRules({ rules, slug }: { rules?: CompetitionRulesModel[]; slug: string }) {
  return (
    <div className="border-4 border-[#AAF3D5] flex flex-col rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2">
        <h3 className="text-white font-bold uppercase">Rules and Guidelines</h3>
      </div>
      <div className="bg-[#390D62]/60 p-6 h-full flex flex-col justify-between gap-4">
        <ul className="text-white space-y-3">
          {rules && rules.length === 0 && (
            <li className="text-white">No rules available for this competition.</li>
          )}
          {rules && rules.map((rule, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-[#AAF3D5]">•</span>
              <span>{rule.description}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 justify-center items-center">
          <Link href={`/competitions/${slug}/register`} className="w-full text-center border-3 border-white bg-black/40 hover:bg-purple-800 text-white font-bold py-3 rounded-lg uppercase transition-all duration-200">
            Register
          </Link>
          {/* Download Button */}
          <button className="w-full text-center border-3 border-white bg-black/40 hover:bg-purple-800 text-white font-bold py-3 rounded-lg uppercase transition-all duration-200">
            Download Guidebook.pdf
          </button>
        </div>
      </div>
    </div>
  );
}
