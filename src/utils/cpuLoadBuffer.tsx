import { useState } from "react";

export const DEFAULT_BUFFER_SIZE = 60;

export type CpuTimestamp = number;
export type CpuValue = number;
export type CpuLoad = { time: CpuTimestamp, value: CpuValue }

export function useCpuTimeSeries(bufferSize: number) {
  const [ringBuffer, setRingBuffer] = useState<CpuLoad[]>([]);
  const push = (point: CpuLoad) => {
    let nextRingBuffer = ringBuffer.slice(
      Math.max(0, ringBuffer.length - bufferSize),
      ringBuffer.length,
    )
    setRingBuffer([...nextRingBuffer, point]);
  }

  return [ringBuffer, push] as const;
}
