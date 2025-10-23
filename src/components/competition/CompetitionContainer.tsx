import React from 'react'
import Link from 'next/link'
import { CompetitionContainerProps } from '@/types/competition.md'

export default function CompetitionContainer({ items }: { items: CompetitionContainerProps[] }) {
  // Handle empty data with a better message
  if (!items || items.length === 0) {
    return (
      <div className="w-full p-8 text-center border rounded-md bg-zinc-100">
        <h3 className="text-lg font-medium text-zinc-800">No Competition Data Available</h3>
        <p className="mt-2 text-zinc-600">
          There are no competitions to display at this time.
        </p>
      </div>
    );
  }

  // Ambil semua kolom dari item pertama, lalu keluarkan 'id' dan 'description'
  const allColumns = Object.keys(items[0]) as Array<keyof CompetitionContainerProps>;
  const columns = allColumns.filter((c) => c !== 'id' && c !== 'description');

  // Format value tanpa menggunakan `any`
  function formatValue(value: unknown): string {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col)}
                className="border border-gray-300 p-2 text-left bg-zinc-800 text-white font-semibold uppercase"
              >
                {String(col).replace(/_/g, ' ')}
              </th>
            ))}
            <th className="border-gray-300 border-l p-2 text-left bg-zinc-800 text-white font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={String(row.id ?? Math.random().toString(36).slice(2, 9))}>
              {columns.map((col) => (
                <td key={String(col)} className="border-l bg-zinc-100 border-black p-2 text-black">
                  {formatValue(row[col])}
                </td>
              ))}
              <td className="border-black bg-zinc-100 flex gap-2 justify-start w-full border-l border-r p-2 text-right">
                <Link
                  href={`/competitions/${String(row.id)}`}
                  className="inline-block w-full text-center bg-zinc-800 text-white px-3 py-1 rounded hover:bg-zinc-700"
                >
                  View
                </Link>
                <Link
                  href={`/competitions/${String(row.id)}/register`}
                  className="inline-block w-full text-center bg-zinc-800 text-white px-3 py-1 rounded hover:bg-zinc-700"
                >
                  Register
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
