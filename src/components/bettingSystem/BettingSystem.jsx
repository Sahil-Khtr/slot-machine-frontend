import React, { useState } from "react";
import "./BettingSystem.css";

const BettingSystem = ({ balance, onBetChange, onSpin }) => {
  const [betAmount, setBetAmount] = useState(10); // Default bet amount

  const handleBetChange = (e) => {
    const newBet = Number(e.target.value);
    setBetAmount(newBet);
    onBetChange(newBet);
  };

  return (
    <div className="betting-system">
      {/* <h2 className="neon-text">Place Your Bet</h2>
      <div className="balance-display">
        <h5>Balance: ${balance}</h5>
      </div> */}
      <div className="betting-controls">
        <fieldset>
          {/* <legend>Bet Amount:</legend> */}
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="betAmount"
                value="10"
                checked={betAmount === 10}
                onChange={handleBetChange}
              />
              $10
            </label>
            <label>
              <input
                type="radio"
                name="betAmount"
                value="100"
                checked={betAmount === 100}
                onChange={handleBetChange}
              />
              $100
            </label>
            <label>
              <input
                type="radio"
                name="betAmount"
                value="1000"
                checked={betAmount === 1000}
                onChange={handleBetChange}
              />
              $1000
            </label>
          </div>
        </fieldset>
        <button onClick={() => onSpin(betAmount)} className="spin-button">
          Spin
        </button>
      </div>
    </div>
  );
};

export default BettingSystem;
