import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, 
  Title,  PointElement,  Title as Title$1, Tooltip as Tooltip$1, Legend as Legend$1, CategoryScale as CategoryScale$1,  PointElement as PointElement$1} from 'chart.js'

  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,  Title,   PointElement,  Title$1, Tooltip$1, Legend$1, CategoryScale$1, PointElement$1)


const doughnutChatOptions = {
  responsive: true,
  plugins:{
    legend:{
      display: false,
    },
  },
  cutout: '90%',
}

const DoughnutChart = ({value=[],labels=[] }) => {
  const data = {
    labels: labels,
          datasets: [
            {
              
              data: value,
              fill: true,
              borderColor: ['#05df72', '#ff6467', '#fdc700'],
              backgroundColor: ['#05df72', '#ff6467', '#fdc700'],
              offset: 15,
            },
          ]
  }
  return (
    <Doughnut data={data} style={{zIndex: 10}}  options={doughnutChatOptions}/>
  )
}

export  {DoughnutChart};