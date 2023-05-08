import { useEffect } from "react";
import RouteManagement from "./router/RouteManagement";

function App() {
  //mengahapus semua data dari local storage ketika browser di close
  useEffect(() => {
    const cleanup = () => {
      localStorage.clear(); // Menghapus semua data dari local storage
    };
    // Register cleanup function
    window.addEventListener("beforeunload", cleanup);
    // Unregister cleanup function
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);
  return (
    <>
      <RouteManagement />
    </>
  );
}

export default App;
