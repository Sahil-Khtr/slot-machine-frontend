import React, { useState, useEffect } from "react";
import "./SlotMachine.css";
import Slot from "../Slot";
import axiosClient from "../../config/axiosClient";
import { Assets } from "../../assets/assets";
import { Form } from "react-bootstrap";
import chips from "/chips-16.png";
import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemToStorage,
} from "../../utils/Helper";
import { StorageConstant } from "../../constants/Constants";

const SlotMachine = () => {
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState([false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [balance, setBalance] = useState(100); // Default user balance
  const [betAmount, setBetAmount] = useState(10); // Default bet amount
  const [betPlaced, setBetPlaced] = useState(false); // New state for tracking if a bet is placed
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (result === "You Win!") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, null, window.location.href);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const spinSlots = async () => {
    const email = getItemFromStorage(StorageConstant?.info).email;

    if (balance < betAmount) {
      setResult("Insufficient Balance!");
      return;
    }

    // Slot item mapping based on server response
    const slotItems = {
      A: "7️⃣",
      B: "💲",
      C: "💰",
      _: "🃏", // Placeholder for non-symbol spaces or blanks
    };
    setBetPlaced(false);
    try {
      // Make the API call to spin the wheel
      const res = await axiosClient.post("wheel/spin", {
        email,
        betAmount,
      });

      console.log(res);
      console.log(res.data.balance);
      removeItemFromStorage("balance");
      setItemToStorage(StorageConstant?.balance, res.data.balance);
      // Update balance with the new balance from the response
      if (res.data && res.data.balance !== undefined) {
        setBalance(res.data.balance);
      }

      if (res.data && res.data.spinResult) {
        // Parse the spin result string from the server response
        const spinResultArray = res.data.spinResult.split(" | ");

        // Map server response to slot symbols
        const newSlots = spinResultArray.map((item) => slotItems[item] || "❓");

        const stopSlot = (index) => {
          setTimeout(() => {
            setSlots((prevSlots) => {
              const updatedSlots = [...prevSlots];
              updatedSlots[index] = newSlots[index];
              return updatedSlots;
            });
            setSpinning((prevSpinning) => {
              const updatedSpinning = [...prevSpinning];
              updatedSpinning[index] = false;
              return updatedSpinning;
            });

            if (index === 2) {
              // Display the result message from the server
              setResult(res.data.payout);

              // You can implement any additional balance adjustments if needed
            }
          }, (index + 1) * (5000 / 3));
        };

        setSpinning([true, true, true]); // Start the spinning animation
        stopSlot(0);
        stopSlot(1);
        stopSlot(2);
      } else {
        setResult("Error: Invalid response from server");
      }
    } catch (error) {
      console.error(error);
      setResult("Error: Unable to spin the wheel");
    }
  };

  const setBetAmountTo = (amount) => {
    setBetAmount(amount);
  };

  const handlePull = () => {
    if (betPlaced && betAmount >= 10 && balance >= betAmount) {
      spinSlots();
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }
    }
  };

  const handleBet = () => {
    if (betAmount >= 10 && balance >= betAmount) {
      setBetPlaced(true); // Set bet as placed
      setResult("Bet placed! Pull the lever to spin.");
    } else {
      setResult("Insufficient balance or invalid bet amount.");
    }
  };

  return (
    <>
      <div className="conatiner">
        <div className="slot-machine m-4">
          <div className="slot-machine-header">
            <h3 className="neon-text text-center pt-3">
              Welcome to the Slot Roll
            </h3>
          </div>
          <div className="slot-machine-body">
            <div className="slot-machine-reels slot-machine-frame">
              {slots.map((slot, index) => (
                <Slot key={index} symbol={slot} spinning={spinning[index]} />
              ))}
            </div>
            {!isSmallScreen && (
              <div
                id="lever"
                onClick={handlePull}
                className={`lever ${isAnimating ? "animating" : ""}`}
              >
                <div className={`top ${isAnimating ? "pull" : ""}`}>
                  <div className={`ball ${isAnimating ? "ballDark" : ""}`}>
                    <p className="p-1" style={{ fontSize: "11px" }}>
                      pull here
                    </p>
                  </div>
                </div>
                <div className={`bottom ${isAnimating ? "bottomDark" : ""}`}>
                  <div className={`screw ${isAnimating ? "screwDark" : ""}`} />
                </div>
              </div>
            )}
          </div>
          <div className="slot-machine-bottom">
            <div className="betting-controls">
              <div className="d-flex justify-content-center align-items-center pt-1">
                <button
                  className="m-1 button button-1 button-1--grey"
                  onClick={() => setBetAmountTo(10)}
                  disabled={balance < 10}
                >
                  10 <img src={chips} alt="10 chips" />
                </button>
                <button
                  className="m-1 button button-1 button-1--grey"
                  onClick={() => setBetAmountTo(100)}
                  disabled={balance < 100}
                >
                  100 <img src={chips} alt="100 chips" />
                </button>
                <button
                  className="m-1 button button-1 button-1--grey"
                  onClick={() => setBetAmountTo(1000)}
                  disabled={balance < 1000}
                >
                  1000 <img src={chips} alt="1000 chips" />
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center pt-1">
              <button
                className="btn"
                onClick={() =>
                  setBetAmount((prev) => {
                    if (prev > 1000) {
                      return Math.max(10, prev - 1000);
                    } else if (prev > 100) {
                      return Math.max(10, prev - 100);
                    } else {
                      return Math.max(10, prev - 10);
                    }
                  })
                }
                disabled={betAmount <= 10}
              >
                <i className="text-light bi bi-dash" />
              </button>
              <Form.Control
                type="number"
                className="w-25 amount-input"
                value={betAmount}
                min="10"
                onChange={(e) =>
                  setBetAmount(Math.max(10, Number(e.target.value)))
                }
              />
              <button
                className="btn"
                onClick={() =>
                  setBetAmount((prev) => {
                    if (prev >= 1000) {
                      return Math.min(10000, prev + 1000);
                    } else if (prev >= 100) {
                      return Math.min(10000, prev + 100);
                    } else {
                      return Math.min(10000, prev + 10);
                    }
                  })
                }
              >
                <i className="text-light bi bi-plus" />
              </button>
              <div className="ml-5 button-container">
                <button
                  className="spin-button"
                  onClick={handleBet}
                  disabled={balance < betAmount || betAmount < 10 || betPlaced}
                >
                  BET
                </button>
              </div>
              {isSmallScreen && (
                <div className="ml-5 button-container">
                  <button
                    className="spin-button"
                    onClick={handlePull}
                    // disabled={
                    //   balance < betAmount || betAmount < 10 || betPlaced
                    // }
                  >
                    Spin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotMachine;
