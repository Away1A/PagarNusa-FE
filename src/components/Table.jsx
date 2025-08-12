import { useState, useMemo } from "react";

export default function Table({ data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const dataKeys = data.length
    ? Object.keys(data[0]).filter((key) => key !== "id")
    : [];

  const headers = ["No", ...dataKeys];

  const formatDate = (iso) => {
    if (!iso) return "-";
    const date = new Date(iso);
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const filteredData = useMemo(() => {
    const sortedData = [...data];
    return sortedData.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const displayHeader = (key) => {
    switch (key) {
      case "tanggal":
        return "Tanggal";
      case "sumber":
        return "Sumber";
      case "keperluan":
        return "Keperluan";
      case "kategori":
        return "Kategori";
      case "jumlah":
        return "Jumlah (Rp)";
      case "keterangan":
        return "Metode Pembayaran";
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  if (!data.length)
    return (
      <div className="mt-6 text-center text-gray-500 italic">
        Tidak ada data untuk ditampilkan.
      </div>
    );

  return (
    <div className="space-y-5 mt-6">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Cari data..."
        className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/2 text-sm focus:ring-2 focus:ring-red-500 transition"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-red-600 text-white sticky top-0">
            <tr>
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  className="p-3 text-left whitespace-nowrap font-semibold"
                >
                  {idx === 0 ? "No" : displayHeader(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition border-b last:border-b-0"
              >
                <td className="p-3 text-center">
                  {(page - 1) * itemsPerPage + idx + 1}
                </td>
                {dataKeys.map((key, j) => (
                  <td key={j} className="p-3 whitespace-nowrap">
                    {key === "jumlah"
                      ? `Rp ${parseInt(row[key] || 0).toLocaleString("id-ID")}`
                      : key === "keterangan"
                      ? row[key] === "TUNAI"
                        ? "Tunai"
                        : row[key]
                        ? "Non-Tunai"
                        : "-"
                      : key === "tanggal"
                      ? formatDate(row[key])
                      : row[key] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 text-sm text-gray-600">
        <span>
          Menampilkan {paginatedData.length} dari {filteredData.length} data
          (halaman {page} dari {totalPages})
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1.5 rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            &larr; Sebelumnya
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1.5 rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            Selanjutnya &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
