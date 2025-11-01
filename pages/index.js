import Head from 'next/head'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Home() {
  const data = {
    labels: ['نونوا', 'اوای موج', 'حیرون', 'بومی‌سرود', 'موج جنوب'],
    datasets: [{
      label: 'درصد فروش',
      data: [65, 58, 72, 48, 53],
      backgroundColor: [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd'
      ],
      borderWidth: 1
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'میانگین درصد فروش کنسرت‌های بندری در شیراز (۱۴۰۳-۱۴۰۴)',
        font: {
          size: 18,
          family: 'Vazirmatn'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.parsed.y + '%'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'درصد فروش از ظرفیت',
          font: {
            family: 'Vazirmatn'
          }
        },
        grid: {
          display: true,
          drawBorder: true,
          lineWidth: 1
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Vazirmatn',
            size: 14
          }
        }
      }
    }
  }

  const plugins = [{
    id: 'dataLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i)
        meta.data.forEach((bar, index) => {
          const data = dataset.data[index]
          ctx.fillStyle = '#000'
          ctx.font = 'bold 14px Vazirmatn'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillText(data + '%', bar.x, bar.y - 5)
        })
      })
    }
  }]

  return (
    <>
      <Head>
        <title>نمودار فروش کنسرت‌ها</title>
        <meta name="description" content="نمودار میانگین فروش کنسرت‌های بندری در شیراز" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="container">
        <div className="chart-wrapper">
          <Bar data={data} options={options} plugins={plugins} />
        </div>
      </main>
    </>
  )
}
