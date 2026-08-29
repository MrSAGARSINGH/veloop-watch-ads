import { useEffect, useState } from "react";

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return initialValue;
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;