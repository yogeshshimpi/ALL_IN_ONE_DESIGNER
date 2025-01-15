import React, { useState, useEffect } from "react";

const ReverseTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Reset timer whenever the `initialTime` prop changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft <= 0) return; // Stop timer if it reaches 0

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount or when `timeLeft` changes
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <p>{timeLeft > 0 ? formatTime(timeLeft) : "00:00"}</p>;
};

export default ReverseTimer;
