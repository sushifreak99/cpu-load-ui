import { useEffect, useRef } from "react";

export function usePolling(fetcher: () => void, msInterval: number) {
  const tid = useRef<number | undefined>(undefined);

  useEffect(() => {
    tid.current = setInterval(fetcher, msInterval)
    return () => clearInterval(tid.current)
  });
}
