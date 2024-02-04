const numBins = 11;

const selectedstr = sessionStorage.getItem('selected');
const probs = JSON.parse(selectedstr);
const correctstr = sessionStorage.getItem('correct');
const accuracy = JSON.parse(correctstr);

// console.log(probs);
// console.log(accuracy);

let ssd = 0;
for (let i = 0; i < accuracy.length; i++) {
    ssd += Math.pow((probs[i] - accuracy[i]), 2);
}

score = ssd / accuracy.length;
document.getElementById('score').textContent = Number(score.toFixed(3));
let result = document.getElementById('result');

let bins = new Array(numBins).fill(0).map(() => ({sumPredicted: 0, sumActual: 0, count: 0}));
// console.log(bins);

probs.forEach((prob, index) => {
    const binIndex = Math.min(Math.floor(prob * numBins), numBins - 1);
    bins[binIndex].sumPredicted += prob;
    bins[binIndex].sumActual += accuracy[index];
    bins[binIndex].count += 1;
});

// Calculate average predicted probability and actual frequency for each bin
let avgPredicted = [];
let avgActual = [];
for (let bin of bins) {
    if (bin.count > 0) {
        avgPredicted.push(bin.sumPredicted / bin.count);
        avgActual.push(bin.sumActual / bin.count);
    } else {
        avgPredicted.push(null);
        avgActual.push(null);
    }
}


const ctx = document.getElementById('myChart').getContext('2d');
const calibrationChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: avgPredicted.map((_, index) => (index + 0.5) / numBins),
        datasets: [{
            label: 'Calibration Curve',
            data: avgActual,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
        }, {
            label: 'Perfectly Calibrated',
            data: avgPredicted.map((_, index) => (index + 0.5) / numBins),
            borderColor: 'red',
            borderWidth: 1,
            fill: false,
            borderDash: [5, 5]
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    callback: function(value, index, values) {
                        return (value / numBins).toFixed(2);
                    }
                },
                title: {
                    display: true,
                    text: 'Mean Predicted Probability'
                }
            },
            y: {
                ticks: {
                    callback: function(value, index, values) {
                        return value.toFixed(1);
                    }
                },
                title: {
                    display: true,
                    text: 'Fraction of Positives'
                }
            }
        }
    }
});
