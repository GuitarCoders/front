import { cls } from "@libs/cls";
import { useCallback, useEffect, useState } from "react";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<any>;
}

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number | null>(null);

  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await onRefresh();
    await wait(500);
    setIsRefreshing(false);
  }, [onRefresh, isRefreshing]);

  const pullStart = (e: any) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };
  const pull = useCallback(
    (e: any) => {
      const touch = e.targetTouches[0];
      const { screenY } = touch;
      let pullLength =
        startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
      setPullChange(pullLength);
    },
    [startPoint]
  );
  const endPull = useCallback(() => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange && pullChange > 350) {
      refresh();
    }
  }, [pullChange, refresh]);

  useEffect(() => {
    if (isTouchDevice) {
      window.addEventListener("touchstart", pullStart);
      window.addEventListener("touchmove", pull);
      window.addEventListener("touchend", endPull);
      return () => {
        window.removeEventListener("touchstart", pullStart);
        window.removeEventListener("touchmove", pull);
        window.removeEventListener("touchend", endPull);
      };
    } else {
      return;
    }
  }, [pull, endPull, isTouchDevice]);

  useEffect(() => {
    setIsTouchDevice(matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  return (
    <div style={{ marginTop: pullChange ? pullChange / 3.118 : 0 }}>
      {isTouchDevice ? (
        <div
          className={cls(
            "flex justify-center items-center h-24",
            isRefreshing ? "animate-spin mt-0" : "-mt-24"
          )}
        >
          <div
            className={cls(
              "flex justify-center items-center w-8 h-8  rounded-full text-white transition-colors",
              isRefreshing || (pullChange && pullChange > 350)
                ? "bg-violet-600"
                : "bg-gray-400"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default PullToRefresh;
