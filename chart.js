const renderChart = async (input = "78288") => {
    const data0 = await getForecast(input);
    const data = data0.forecast.forecastday

    const high = data.map(i => {return i.day.maxtemp_f});
    const low = data.map(i => {return i.day.mintemp_f});
    const humidity = data.map(i => {return i.day.avghumidity});
    const ctx = document.getElementById('chart');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'High Temperature',
                data: high,
                fill: false,
                backgroundColor: 'rgba(255, 0, 0)',
                borderColor: 'rgba(255, 0, 0)',
                borderWidth: 1
            },
            {
                label: 'Low Temperature',
                data: low,
                fill: false,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0, 0, 255)',
                borderWidth: 1
            },
            {
                label: 'Humidity',
                data: humidity,
                fill: false,
                backgroundColor: 'rgb(128,0,128)',
                borderColor: 'rgb(128,0,128)',
                borderWidth: 1
            }
        ]    
    },
        options: {
            scales: {
                yAxes: [{ display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Fahrenheit"
                    },
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

}


