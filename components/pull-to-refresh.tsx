import { useCallback, useEffect, useRef, useState } from "react";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => void;
}

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const initLoading = useCallback(() => {
    if (ref.current) {
      ref.current.classList.add("loading");
      setTimeout(() => {
        onRefresh;
      }, 1000);
    }
  }, [onRefresh]);

  const pullStart = (e: any) => {
    console.log("pull start");
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  };
  const pull = useCallback(
    (e: any) => {
      console.log("pull");
      const touch = e.targetTouches[0];
      const { screenY } = touch;
      let pullLength =
        startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
      setPullChange(pullLength);
      console.log({ screenY, startPoint, pullLength, pullChange });
    },
    [pullChange, startPoint]
  );
  const endPull = useCallback(
    (e: any) => {
      console.log("end pull");
      setStartPoint(0);
      setPullChange(0);
      if (pullChange && pullChange > 220) initLoading();
    },
    [pullChange, initLoading]
  );

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);
    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, [pull, endPull]);

  return (
    <div ref={ref} style={{ marginTop: pullChange ? pullChange / 3.118 : "" }}>
      {children}
    </div>
  );
};

export default PullToRefresh;
