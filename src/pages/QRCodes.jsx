import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { rooms } from "../data/rooms";
import "../styles/index.css";

const QRCodes = () => {
  const BASE_URL = window.location.origin;
  const roomKeys = Object.keys(rooms);

  return (
    <div className="qrcodes-page">
      <div className="print-header">
        <h1>Puzzle Hunt QR Codes</h1>
        <button className="print-btn" onClick={() => window.print()}>
          Print All
        </button>
      </div>
      <div className="qr-grid">
        {roomKeys.map((roomId) => (
          <div key={roomId} className="qr-card">
            <QRCodeSVG
              value={`${BASE_URL}/room/${roomId}`}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              includeMargin={true}
            />
            <h2 className="qr-label">{rooms[roomId].title}</h2>
            <p className="qr-url">{`${BASE_URL}/room/${roomId}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodes;
