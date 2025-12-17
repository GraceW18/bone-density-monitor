// Initialize dashboard when called from HTML
function initDashboard(readings) {
    if (!readings || readings.length === 0) {
        console.warn('No readings data available');
        return;
    }
    initCounterAnimations();
    createDensityChart(readings);
}

// Counter Animation for metric values
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter-animation');

    counters.forEach(counter => {
        const targetStr = counter.getAttribute('data-target');
        if (!targetStr) return;

        const target = parseFloat(targetStr);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            const decimals = target >= 10 ? 0 : 2;

            if (current < target) {
                counter.textContent = current.toFixed(decimals);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toFixed(decimals);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Create Chart with proper type checking
function createDensityChart(readings) {
    const canvas = document.getElementById('densityChart');
    if (!canvas || typeof Chart === 'undefined') {
        console.error('Chart.js not loaded or canvas not found');
        return;
    }

    // Process data safely with type checking
    const labels = readings.map(reading => {
        const timestamp = reading.timestamp || new Date();
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }).reverse();

    const densityData = readings.map(reading => {
        const value = reading.density;
        return typeof value === 'number' ? value : parseFloat(value) || 0;
    }).reverse();

    const impedanceData = readings.map(reading => {
        const value = reading.acousticImpedance;
        return typeof value === 'number' ? value : parseFloat(value) || 0;
    }).reverse();

    // Create dataset helper function
    const createDataset = (label, data, color, yAxisID) => ({
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color.replace(')', ', 0.1)').replace('rgb', 'rgba'),
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        yAxisID: yAxisID,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 3
    });

    // Initialize Chart
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset('Bone Density (g/cm²)', densityData, '#0077b6', 'y'),
                createDataset('Acoustic Impedance (MRayl)', impedanceData, '#48cae4', 'y1')
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            return label + ': ' + (typeof value === 'number' ? value.toFixed(2) : '0.00');
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Bone Density (g/cm²)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return typeof value === 'number' ? value.toFixed(2) : '0.00';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Acoustic Impedance (MRayl)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return typeof value === 'number' ? value.toFixed(1) : '0.0';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});