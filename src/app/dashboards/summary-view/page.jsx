// pages/dashboard.js
import { ChartComponent } from "../components";

const Dashboard = () => {
    const doughnutData = {
        labels: ["Product A", "Product B", "Product C"],
        datasets: [
          {
            label: "Sales Distribution",
            data: [300, 50, 100],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            hoverOffset: 4
            // borderWidth: 1,
          },
        ],
      };

  const lineData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales Over Time",
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div>
      <h1>CRM Dashboard</h1>
      <div style={{ height: "300px" }}>
        <ChartComponent
          chartData={doughnutData}
          options={options}
          type="doughnut"
        />
      </div>

      <ChartComponent chartData={lineData} options={options} type="line" />
    </div>
  );
};

export default Dashboard;
