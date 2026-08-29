import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import usePersistentState from "./usePersistentState";

function useAdWatch() {
  const [watchingAds, setWatchingAds] = useState({});

  const [completedAds, setCompletedAds] =
    usePersistentState(
      "veloop_completed_ads",
      []
    );

  const [rewardEarned, setRewardEarned] =
    useState(null);

  const timersRef = useRef({});

  const clearTimer = useCallback((adId) => {
    if (timersRef.current[adId]) {
      clearInterval(timersRef.current[adId]);

      delete timersRef.current[adId];
    }
  }, []);

  const startWatching = useCallback(
    (ad) => {
      if (!ad || completedAds.includes(ad.id)) {
        return;
      }

      clearTimer(ad.id);

      setRewardEarned(null);

      const duration = Math.max(
        Number(ad.duration) || 1,
        1
      );

      setWatchingAds((previous) => ({
        ...previous,
        [ad.id]: {
          timeLeft: duration,
        },
      }));

      let remaining = duration;

      timersRef.current[ad.id] = setInterval(() => {
        remaining -= 1;

        setWatchingAds((previous) => ({
          ...previous,
          [ad.id]: {
            timeLeft: Math.max(remaining, 0),
          },
        }));

        if (remaining <= 0) {
          clearTimer(ad.id);

          setWatchingAds((previous) => {
            const updated = { ...previous };

            delete updated[ad.id];

            return updated;
          });

          setCompletedAds((previous) => {
            if (previous.includes(ad.id)) {
              return previous;
            }

            return [...previous, ad.id];
          });

          setRewardEarned(ad);
        }
      }, 1000);
    },
    [
      clearTimer,
      completedAds,
      setCompletedAds,
    ]
  );

  const isWatching = useCallback(
    (adId) => {
      return Boolean(watchingAds[adId]);
    },
    [watchingAds]
  );

  const isCompleted = useCallback(
    (adId) => {
      return completedAds.includes(adId);
    },
    [completedAds]
  );

  const getTimeLeft = useCallback(
    (adId) => {
      return watchingAds[adId]?.timeLeft ?? 0;
    },
    [watchingAds]
  );

  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach(
        (adId) => {
          clearTimer(adId);
        }
      );
    };
  }, [clearTimer]);

  return {
    rewardEarned,
    startWatching,
    isWatching,
    isCompleted,
    getTimeLeft,
  };
}

export default useAdWatch;