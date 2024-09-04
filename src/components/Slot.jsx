import React, { useEffect, useState } from "react";

const Slot = ({ symbol, spinning }) => {
  const [displaySymbol, setDisplaySymbol] = useState(symbol);

  useEffect(() => {
    let spinInterval;

    if (spinning) {
      spinInterval = setInterval(() => {
        const slotItems = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍌"];
        setDisplaySymbol(
          slotItems[Math.floor(Math.random() * slotItems.length)]
        );
      }, 100);
    } else {
      setDisplaySymbol(symbol);
    }

    return () => clearInterval(spinInterval);
  }, [spinning, symbol]);

  return (
    <div className={`slot ${spinning ? "spinning" : ""}`}>
      <div className="slot-row">
        <div className="slot-icon">{displaySymbol}</div>
      </div>
    </div>
  );
};

export default Slot;
