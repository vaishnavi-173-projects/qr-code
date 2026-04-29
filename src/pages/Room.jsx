import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { rooms } from "../data/rooms";

const Room = () => {
  const { roomId } = useParams();
  const room = rooms[roomId?.toLowerCase()];

  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(null); // null | "correct" | "wrong"
  const [showHint, setShowHint] = useState(false);
  const [shakeKey, setShakeKey] = useState(0); // increment to re-trigger shake
  
  useEffect(() => {
    const blockCopy = (e) => {
      if ((e.ctrlKey || e.metaKey) && 
          ['c','x','a','u','s'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    const blockContext = (e) => e.preventDefault();

    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('keydown', blockCopy);

    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('keydown', blockCopy);
    };
  }, []);

  if (!room) {
    return (
      <div className="centered">
        <h1 style={{ color: "#ff4444" }}>Room Not Found</h1>
        <p style={{ color: "#aaa", marginTop: "10px" }}>
          Check your QR code and try again.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAns = answer.trim().replace(/^0+/, "") || "0";
    const correctAns = room.answer.replace(/^0+/, "") || "0";

    if (userAns.toLowerCase() === correctAns.toLowerCase()) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setShakeKey((k) => k + 1); // re-trigger shake animation
    }
  };

  const isCorrect = status === "correct";
  const isWrong = status === "wrong";

  return (
    <div 
      className="centered" 
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        // Only prevent default if it's not the input field to allow focusing
        if (e.target.tagName !== 'INPUT') {
          // This helps block long-press selection on mobile
        }
      }}
    >
      <div className="room-container">
        <h1>Puzzle Room</h1>

        <div className="puzzle-box">
          <p className="puzzle">{room.puzzle}</p>
        </div>

        {!isCorrect && (
          <form
            key={shakeKey}
            onSubmit={handleSubmit}
            className={isWrong ? "shake" : ""}
          >
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (status === "wrong") setStatus(null);
              }}
              placeholder="Your answer…"
              className="answer-input"
              autoFocus
              autoComplete="off"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        )}

        {isWrong && (
          <p className="error-msg">✗ Wrong answer. Try again.</p>
        )}

        {!isCorrect && (
          <button
            className="hint-btn"
            onClick={() => setShowHint((v) => !v)}
          >
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
        )}

        {showHint && !isCorrect && (
          <p className="hint-text">{room.hint}</p>
        )}

        {isCorrect && (
          <div className="result-box correct">
            <span className="check-icon">✓</span>
            Unlocked: <strong>{room.code}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
