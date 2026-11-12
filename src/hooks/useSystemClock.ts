import { useState, useEffect } from "react";

export function useSystemClock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const dayOfMonth = time.getDate();

  let hours = time.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = time.getMinutes().toString().padStart(2, "0");
  const secondsStr = time.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${dayName} ${monthName} ${dayOfMonth}  ${hoursStr}:${minutesStr}:${secondsStr} ${ampm}`;
  const formattedTimeOnly = `${hoursStr}:${minutesStr} ${ampm}`;

  return {
    rawTime: time,
    formattedDateTime,
    formattedTimeOnly,
    hoursStr,
    minutesStr,
    secondsStr,
  };
}
