// Enhanced Dashboard JavaScript Functions

function initDashboard(readings) {
    console.log('Initializing dashboard with readings:', readings);

    // Initialize counter animations
    initCounterAnimations();

    // Initialize progress ring
    initProgressRing();

    // Initialize the chart with the readings data
    if (readings && readings.length > 0) {
        createDensityChart(readings);
    } else {
        console.error('No readings data available for chart');
    }
}

// Counter Animation for Numbers
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter-animation');

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = current.toFixed(2);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toFixed(2);
            }
        };

        // Start animation when element is in viewport
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

// Progress Ring Animation
function initProgressRing() {
    const progressRing = document.querySelector('.progress-ring-fill');
    if (!progressRing) return;

    const percentage = parseFloat(progressRing.getAttribute('data-percentage'));
    const radius = 60; // Updated radius
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    // Set CSS variable for animation
    progressRing.style.setProperty('--progress', percentage);

    // Animate on load
    setTimeout(() => {
        progressRing.style.strokeDashoffset = offset;
    }, 500);
}

// Create Density Chart with Enhanced Animations
function createDensityChart(readings) {
    const ctx = document.getElementById('densityChart');
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }

    console.log('Creating chart with readings:', readings);

    const labels = readings.map(reading => {
        const date = new Date(reading.timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }).reverse();

    const densityData = readings.map(reading => reading.density).reverse();
    const impedanceData = readings.map(reading => reading.acousticImpedance).reverse();

    console.log('Chart labels:', labels);
    console.log('Density data:', densityData);
    console.log('Impedance data:', impedanceData);

    const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Bone Density (g/cm²)',
                    data: densityData,
                    borderColor: '#0077b6',
                    backgroundColor: 'rgba(0, 119, 182, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#0077b6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#0077b6',
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Acoustic Impedance (MRayl)',
                    data: impedanceData,
                    borderColor: '#48cae4',
                    backgroundColor: 'rgba(72, 202, 228, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#48cae4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#48cae4',
                    pointHoverBorderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
                onComplete: () => {
                    console.log('Chart animation complete');
                    addChartSparkle(ctx);
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
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
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2);
                            }
                            return label;
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
                            return value.toFixed(2);
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
                        drawOnChartArea: false,
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
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

    console.log('Chart created successfully:', chartInstance);
}

// Add sparkle effect to chart
function addChartSparkle(canvas) {
    const sparkles = document.createElement('div');
    sparkles.className = 'chart-sparkles';
    sparkles.style.position = 'absolute';
    sparkles.style.top = '0';
    sparkles.style.left = '0';
    sparkles.style.width = '100%';
    sparkles.style.height = '100%';
    sparkles.style.pointerEvents = 'none';

    canvas.parentElement.style.position = 'relative';
    canvas.parentElement.appendChild(sparkles);

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#0077b6';
            sparkle.style.borderRadius = '50%';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';

            sparkles.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    .dashboard-card {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Function to update dashboard with new reading
function updateDashboard(newReading) {
    const valueNumber = document.querySelector('.value-number');
    const statusText = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    const metricValue = document.querySelector('.metric-value');
    const readingTime = document.querySelector('.reading-time span');

    if (valueNumber) {
        animateValue(valueNumber, parseFloat(valueNumber.textContent), newReading.density, 1000);
    }

    if (statusText) {
        statusText.textContent = newReading.healthStatus;
    }

    if (statusIndicator) {
        statusIndicator.classList.remove('healthy', 'warning', 'concerning');
        statusIndicator.classList.add(newReading.healthStatus.toLowerCase());
    }

    if (metricValue) {
        animateValue(metricValue, parseFloat(metricValue.textContent), newReading.acousticImpedance, 1000);
    }

    if (readingTime) {
        const date = new Date(newReading.timestamp);
        readingTime.textContent = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    addTableRow(newReading);
}

// Animate value changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end.toFixed(2);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(2);
        }
    }, 16);
}

// Add new row to table with animation
function addTableRow(reading) {
    const tbody = document.querySelector('.readings-table tbody');
    if (!tbody) return;

    const row = document.createElement('tr');
    row.className = 'table-row-animate';
    const date = new Date(reading.timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    row.innerHTML = `
        <td>${formattedDate}</td>
        <td>${reading.density.toFixed(2)}</td>
        <td>${reading.acousticImpedance.toFixed(1)}</td>
        <td>
            <span class="table-status ${reading.healthStatus.toLowerCase()}">
                ${reading.healthStatus}
            </span>
        </td>
    `;

    tbody.insertBefore(row, tbody.firstChild);

    if (tbody.children.length > 10) {
        tbody.removeChild(tbody.lastChild);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});