import { HIGH_AVG_CPU_LOAD, INTERVAL_READ_MS } from "../utils/constants";
import { CpuLoad } from "../utils/cpuLoadBuffer";

type CpuHighLoadState = {
  fromWhen: number,
  tillWhen: number,
}

export const INITIAL: CpuHighLoadState = {
  fromWhen: 0,
  tillWhen: 0,
};

export function highLoadReducer(state: CpuHighLoadState, load: CpuLoad): CpuHighLoadState {
  const { tillWhen } = state;
  const { time, value } = load;
  if (value === HIGH_AVG_CPU_LOAD) { 
    return {
      fromWhen: time - tillWhen > INTERVAL_READ_MS ? time : state.fromWhen,
      tillWhen: time
    }
  }
  return state;
}

export function computeIsUnderHighLoad(state: CpuHighLoadState, threshold: number): boolean {
  return state.tillWhen - state.fromWhen >= threshold;
}
