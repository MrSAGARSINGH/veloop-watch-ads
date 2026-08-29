import { useEffect, useState } from "react";

function getTodayKey() {
  const now = new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}

function useDailyPersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (!savedValue) {
        return initialValue;
      }

      const parsedValue = JSON.parse(savedValue);
      const today = getTodayKey();

      if (parsedValue.date !== today) {
        return initialValue;
      }

      return parsedValue.value;
    } catch (error) {
      console.error(
        `Failed to load daily ${key}:`,
        error
      );

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          date: getTodayKey(),
          value: state,
        })
      );
    } catch (error) {
      console.error(
        `Failed to save daily ${key}:`,
        error
      );
    }
  }, [key, state]);

  return [state, setState];
}

export default useDailyPersistentState;