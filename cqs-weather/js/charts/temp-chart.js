const images = {'01d':'http://openweathermap.org/img/wn/01d@2x.png', 
                '02d':'http://openweathermap.org/img/wn/02d@2x.png', 
                '03d':'http://openweathermap.org/img/wn/03d@2x.png', 
                '04d':'http://openweathermap.org/img/wn/04d@2x.png',  
                '09d':'http://openweathermap.org/img/wn/09d@2x.png', 
                '10d':'http://openweathermap.org/img/wn/10d@2x.png', 
                '11d':'http://openweathermap.org/img/wn/11d@2x.png', 
                '13d':'http://openweathermap.org/img/wn/13d@2x.png', 
                '50d':'http://openweathermap.org/img/wn/50d@2x.png',
				'01n':'http://openweathermap.org/img/wn/01n@2x.png', 
                '02n':'http://openweathermap.org/img/wn/02n@2x.png', 
                '03n':'http://openweathermap.org/img/wn/03n@2x.png', 
                '04n':'http://openweathermap.org/img/wn/04n@2x.png',  
                '09n':'http://openweathermap.org/img/wn/09n@2x.png', 
                '10n':'http://openweathermap.org/img/wn/10n@2x.png', 
                '11n':'http://openweathermap.org/img/wn/11n@2x.png', 
                '13n':'http://openweathermap.org/img/wn/13n@2x.png', 
                '50n':'http://openweathermap.org/img/wn/50n@2x.png'};

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Area Chart Example
var ctx = document.getElementById("areaTemp");
var tempChart;

/**
 * This function create the Chart of the Temp, feels_like and add the icons of the weather
 * @param {list} dataTemp 
 * @param {list} dataFeels 
 * @param {list} dataIcons 
 */
function setTempChart(dataTemp, dataFeels, dataIcons){

    var imagesActual = []

    for( let icon of dataIcons){
        imagesActual.push(images[icon])
    }

    tempChart = new Chart(ctx, {
        plugins: [{
            afterDraw: chart => {      
              var ctx = chart.chart.ctx; 
              var xAxis = chart.scales['x-axis-0'];
              var yAxis = chart.scales['y-axis-0'];
              xAxis.ticks.forEach((value, index) => { 
                var x = xAxis.getPixelForTick(index);
                var image = new Image();
                image.src = imagesActual[index];
                image.height=10;
                image.width=10;
                ctx.drawImage(image, x - 25, yAxis.bottom+20, 50, 50);
              });      
            }
          }],
        data: {
            labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
            datasets: [{  
                type: 'line',
                label: "Temperature",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: dataTemp
            },
            {
                type: 'line',
                label: "Feels Like",
                backgroundColor: "rgb(255, 99, 132, 0.2)",
                hoverBackgroundColor: "#2e59d9",
                borderColor: "rgb(255, 99, 132)",
                data: dataFeels,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 50
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 5,
                        maxTicksLimit: 9,
                        callback: function(value, index, values) {
                            return number_format(value) + 'h';
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return number_format(value) + '°C';
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + " " + number_format(tooltipItem.yLabel) + '°C';
                }
            }
        }
    }});
}

/**
 * This function clean the chart to reload it.
 */
function destroyTempChart(){
    tempChart.destroy();
}