import './App.css'
import { DEFAULT_BUFFER_SIZE, useCpuTimeSeries } from './utils/cpuLoadBuffer'
import { usePolling } from './utils/polling'

let x = 0;
function App() {
  const [cpuLoad, push] = useCpuTimeSeries(DEFAULT_BUFFER_SIZE);
  usePolling(() => {
    push({ time: x, value: 1 });
    x += 1;
  }, 1000)

  return (
    <ul>{cpuLoad.map(({value, time}, ix) => <li>{ix}: value {value} time {time}</li>)}</ul>
  )
}

export default App
