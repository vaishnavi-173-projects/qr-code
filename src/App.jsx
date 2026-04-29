import { Routes, Route, Navigate } from "react-router-dom";
import Room from "./pages/Room";
import QRCodes from "./pages/QRCodes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/qrcodes" />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/qrcodes" element={<QRCodes />} />
    </Routes>
  );
}

export default App;
