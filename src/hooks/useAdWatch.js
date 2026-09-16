import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useDailyPersistentState from "./useDailyPersistentState";

function useAdWatch(initialCompletedAds = []) {
  const [watchingAds, setWatchingAds] = useState({});

  const [completedAds, setCompletedAds] =
    useDailyPersistentState(
      "veloop_completed_ads",
      initialCompletedAds,
    );

  const [rewardEarned, setRewardEarned] =
    useState(null);

  const timersRef = useRef({});
  const activeAdIdRef = useRef(null);
  const completedAdsRef = useRef(completedAds);

  // Keep the latest completed ads available inside timers

  useEffect(() => {
    completedAdsRef.current = completedAds;
  }, [completedAds]);

  // Clear a particular advertisement timer

  const clearTimer = useCallback((adId) => {
    const timer = timersRef.current[adId];

    if (!timer) return;

    window.clearInterval(timer);
    delete timersRef.current[adId];
  }, []);

  // Complete advertisement and issue reward once

  const completeAd = useCallback(
    (ad) => {
      if (!ad) return;

      clearTimer(ad.id);

      activeAdIdRef.current = null;

      setWatchingAds((previous) => {
        const updated = { ...previous };

        delete updated[ad.id];

        return updated;
      });

      let rewardShouldBeIssued = false;

      setCompletedAds((previous) => {
        const safePrevious = Array.isArray(previous)
          ? previous
          : [];

        if (safePrevious.includes(ad.id)) {
          return safePrevious;
        }

        rewardShouldBeIssued = true;

        const updated = [
          ...safePrevious,
          ad.id,
        ];

        completedAdsRef.current = updated;

        return updated;
      });

      if (rewardShouldBeIssued) {
        setRewardEarned({
          ...ad,
          completedAt: Date.now(),
        });
      }
    },
    [clearTimer, setCompletedAds],
  );

  // Start watching an advertisement

  const startWatching = useCallback(
    (ad) => {
      if (!ad?.id) return false;

      const alreadyCompleted =
        completedAdsRef.current.includes(ad.id);

      const anotherAdIsActive =
        activeAdIdRef.current !== null &&
        activeAdIdRef.current !== ad.id;

      const sameAdIsActive =
        activeAdIdRef.current === ad.id;

      if (
        alreadyCompleted ||
        anotherAdIsActive ||
        sameAdIsActive
      ) {
        return false;
      }

      const duration = Math.max(
        Number(ad.duration) || 1,
        1,
      );

      const endTime =
        Date.now() + duration * 1000;

      activeAdIdRef.current = ad.id;

      setRewardEarned(null);

      setWatchingAds({
        [ad.id]: {
          timeLeft: duration,
          startedAt: Date.now(),
          endTime,
        },
      });

      const updateTimer = () => {
        const millisecondsLeft =
          endTime - Date.now();

        const secondsLeft = Math.max(
          Math.ceil(millisecondsLeft / 1000),
          0,
        );

        if (secondsLeft <= 0) {
          completeAd(ad);
          return;
        }

        setWatchingAds({
          [ad.id]: {
            timeLeft: secondsLeft,
            startedAt:
              endTime - duration * 1000,
            endTime,
          },
        });
      };

      timersRef.current[ad.id] =
        window.setInterval(updateTimer, 250);

      return true;
    },
    [completeAd],
  );

  // Advertisement state helpers

  const isWatching = useCallback(
    (adId) =>
      activeAdIdRef.current === adId &&
      Boolean(watchingAds[adId]),
    [watchingAds],
  );

  const isCompleted = useCallback(
    (adId) => completedAds.includes(adId),
    [completedAds],
  );

  const getTimeLeft = useCallback(
    (adId) =>
      watchingAds[adId]?.timeLeft ?? 0,
    [watchingAds],
  );

  const isAnyAdWatching =
    activeAdIdRef.current !== null;

  const activeAdId =
    activeAdIdRef.current;

  // Clear timers when component unmounts

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      Object.values(timers).forEach((timer) => {
        window.clearInterval(timer);
      });

      Object.keys(timers).forEach((key) => {
        delete timers[key];
      });

      activeAdIdRef.current = null;
    };
  }, []);

  return {
    rewardEarned,
    startWatching,
    isWatching,
    isCompleted,
    getTimeLeft,
    isAnyAdWatching,
    activeAdId,
  };
}

export default useAdWatch;