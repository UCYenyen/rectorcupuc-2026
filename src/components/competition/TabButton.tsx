import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-6 py-2 font-bold text-white uppercase transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${
        isActive
          ? 'bg-gradient-to-r from-[#6427A8] to-[#EB79F0] border-b-4 border-[#AAF3D5]'
          : 'hover:bg-white/10 border-b-4 border-transparent'
      }`}
    >
      {label}
    </button>
  );
}