import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadPanel() {
  const [files, setFiles] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const allRows = [];
    let filesProcessed = 0;

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const rows = jsonData.slice(1);
        allRows.push(...rows);
        filesProcessed++;
        if (filesProcessed === selectedFiles.length) {
          setMergedData(allRows.slice(0, 50));
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">📁 上傳你的海鷹 Excel 檔案</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        multiple
        onChange={handleFileUpload}
        className="mb-4"
      />

      {files.length > 0 && (
        <div className="mb-4">
          <p>✅ 共選擇 {files.length} 個檔案：</p>
          <ul className="list-disc list-inside text-sm">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {mergedData.length > 0 && (
        <div className="overflow-auto">
          <h3 className="text-lg font-semibold mb-2">📊 合併預覽（前 50 筆）</h3>
          <table className="table-auto border border-gray-300">
            <thead>
              <tr>
                {mergedData[0].map((_, idx) => (
                  <th key={idx} className="border px-2 py-1 text-xs font-bold bg-gray-100">
                    欄位 {idx + 1}
                  </th>
                ))}
                <th className="border px-2 py-1 text-xs font-bold bg-blue-100">預計採購數量</th>
              </tr>
            </thead>
            <tbody>
              {mergedData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1 text-xs">
                      {cell}
                    </td>
                  ))}
                  <td className="border px-2 py-1 text-xs">
                    <input
                      type="number"
                      min="0"
                      className="w-20 border rounded px-1 py-0.5 text-right"
                      value={quantities[i] || ""}
                      onChange={(e) => handleQuantityChange(i, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
