import { Line } from 'react-chartjs-2';
import './App.css'
import { DEFAULT_BUFFER_SIZE, useCpuTimeSeries } from './utils/cpuLoadBuffer'
import { usePolling } from './utils/polling'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let x = 0;
function App() {
  const [cpuLoad, push] = useCpuTimeSeries(DEFAULT_BUFFER_SIZE);
  usePolling(() => {
    push({ time: x, value: 1 });
    x += 1;
  }, 1000)


  return (
    <Line
      options={{
        spanGaps: true,
        responsive: true,
        scales: {
          yAxis: {
            max: 1.05,
            min: 0,
            position: 'right',
            display: false,
          }
        },
      }}
      width={'1200'}
      height={'400'}
      data={{
        labels: cpuLoad.map(({ time } ) => time),
        datasets: [
          {
            label: 'CPU avg. load',
            data: cpuLoad.map(({ value }) => value),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        ],
      }}
    />
  )
}

export default App
