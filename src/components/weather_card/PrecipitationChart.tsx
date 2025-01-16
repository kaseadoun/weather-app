import { useEffect, useRef } from 'react';
import { Chart } from "chart.js/auto";

const PrecipitationChart = ({ chartData, location }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: `Probability of Precipitation in ${location["name"]}`
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    // Customize the tooltip label here
                                    return `Value: ${context.parsed.y}`;
                                },
                                title: function (tooltipItems) {
                                    // Use the current label as the tooltip title
                                    let hour = "";
                                    // console.log(tooltipItems);
                                    if (Number(tooltipItems[0].label) < 10) {
                                        hour += "0";
                                    }
                                    const currentLabel = tooltipItems[0].label;
                                    return `${hour}${currentLabel}00h`;
                                },
                            },
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Hour (24h)'
                            }
                        },
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                callback: function (value, index, ticks) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return <canvas ref={chartRef}></canvas>;
}

export default PrecipitationChart;