import { useState } from "react";

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handleLogin = () => {
    if (inputPassword === "maoboss") {
      setAuthorized(true);
    } else {
      alert("密碼錯誤！請再試一次。");
    }
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-80">
          <h1 className="text-xl font-bold mb-4 text-center">🔐 請輸入密碼</h1>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="輸入密碼"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={handleLogin}
          >
            進入系統
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📊 MaoBoss Analyzer</h1>
      <p>這是主頁區塊，登入成功後你會看到上傳功能、SKU 表格、分類分析等。</p>
    </div>
  );
}
