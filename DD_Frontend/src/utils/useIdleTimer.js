import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

function useIdle({ onIdle, idleTime }) {
  const [isIdle, setIsIdleState] = useState(null);

  //handles what happens when the user is idle
  const handleOnIdle = (event) => {
    setIsIdleState(true); //set the state to true
    const currentTime = new Date();
    const formattedCurrentTime = currentTime.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    console.log("user is idle", event); //log the user is idle followed by the event
    console.log("Last Active time", getLastActiveTime()); // you the log the time the user was last active
    console.log("Current time", formattedCurrentTime); //gets the curent time maybe to see what
    onIdle(); //then call onIdle function
  };

  const { getRemainingTime, getLastActiveTime, setIsIdle, start, activate } = useIdleTimer({
    timeout: 1000 * 60 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500,
    crossTab: true,
  });
  return {
    getRemainingTime,
    getLastActiveTime,
    isIdle,
    setIsIdle,
    start
  };
}

export default useIdle;