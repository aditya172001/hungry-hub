"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isProgressBarVisibleState } from "store";

export function ProgressBar() {
  const isProgressBarVisible = useRecoilValue(isProgressBarVisibleState);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        return prevProgress < 90
          ? prevProgress + Math.floor(Math.random() * 10) + 1
          : prevProgress;
      });
    }, 600);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {isProgressBarVisible === true && (
        <div
          className={`h-1 bg-violet-600 ease-in-out transition-all `}
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />
      )}
    </>
  );
}
