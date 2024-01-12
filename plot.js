const ctx = document.getElementById('myChart').getContext('2d');

// Generate synthetic data
const data = Array.from({ length: 100 }, (_, i) => ({
  x: i / 100,
  y: i / 100 + (Math.random() * 0.1 - 0.05) // adding some noise
}));

// Sort data by x to ensure the line is plotted correctly
data.sort((a, b) => a.x - b.x);

// Prepare the datasets for the line and the shaded area (error region)
const datasets = [
  {
    label: 'Mean Line',
    data: data,
    borderColor: 'red',
    borderWidth: 2,
    fill: false,
    type: 'line'
  },
  {
    label: 'Confidence Interval',
    data: data.map(d => ({ x: d.x, y: d.y + (Math.random() * 0.1 - 0.05) })),
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    borderWidth: 1,
    fill: '+1' // fill to next dataset
  }
];

// Create the chart
const myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: datasets
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    },
    elements: {
      line: {
        tension: 0.4 // This will smooth the line
      }
    }
  }
});
