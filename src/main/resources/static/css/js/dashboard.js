// Dashboard JavaScript Functions

function initDashboard(readings) {
    // Initialize the chart with the readings data
    createDensityChart(readings);

    // Set up any real-time updates if needed
    // setupRealtimeUpdates();
}

function createDensityChart(readings) {
    const ctx = document.getElementById('densityChart');
    if (!ctx) return;

    // Prepare data for the chart
    const labels = readings.map(reading => {
        const date = new Date(reading.timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }).reverse();

    const densityData = readings.map(reading => reading.density).reverse();
    const impedanceData = readings.map(reading => reading.acousticImpedance).reverse();

    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Bone Density (g/cm²)',
                    data: densityData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Acoustic Impedance (MRayl)',
                    data: impedanceData,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: false
                },
                tooltip: {
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
                        text: 'Bone Density (g/cm²)'
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
                        text: 'Acoustic Impedance (MRayl)'
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
                    }
                }
            }
        }
    });
}

// Function to update dashboard with new reading
function updateDashboard(newReading) {
    // Update current reading display
    const valueNumber = document.querySelector('.value-number');
    const statusText = document.querySelector('.status-text');
    const statusIndicator = document.querySelector('.status-indicator');
    const metricValue = document.querySelector('.metric-value');
    const readingTime = document.querySelector('.reading-time span');

    if (valueNumber) {
        valueNumber.textContent = newReading.density.toFixed(2);
    }

    if (statusText) {
        statusText.textContent = newReading.healthStatus;
    }

    if (statusIndicator) {
        // Remove old status classes
        statusIndicator.classList.remove('healthy', 'warning', 'concerning');
        // Add new status class
        statusIndicator.classList.add(newReading.healthStatus.toLowerCase());
    }

    if (metricValue) {
        metricValue.textContent = newReading.acousticImpedance.toFixed(1);
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

    // Add new row to table
    addTableRow(newReading);
}

// Function to add a new row to the readings table
function addTableRow(reading) {
    const tbody = document.querySelector('.readings-table tbody');
    if (!tbody) return;

    const row = document.createElement('tr');
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

    // Insert at the beginning of the table
    tbody.insertBefore(row, tbody.firstChild);

    // Remove last row if more than 10 rows
    if (tbody.children.length > 10) {
        tbody.removeChild(tbody.lastChild);
    }
}

// Function to set up real-time updates (for future ESP32 integration)
function setupRealtimeUpdates() {
    // This would connect to your ESP32 device via WebSocket or polling
    // For now, it's a placeholder for future implementation

    // Example WebSocket connection (commented out):
    /*
    const ws = new WebSocket('ws://your-esp32-ip:port');

    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        const newReading = {
            userId: data.userId,
            density: data.density,
            acousticImpedance: data.acousticImpedance,
            healthStatus: determineHealthStatus(data.density),
            timestamp: new Date().toISOString()
        };
        updateDashboard(newReading);
    };
    */
}

// Helper function to determine health status from density
function determineHealthStatus(density) {
    if (density >= 1.0) {
        return 'Healthy';
    } else if (density >= 0.8) {
        return 'Warning';
    } else {
        return 'Concerning';
    }
}

// Function to export data as CSV
function exportDataAsCSV() {
    const table = document.querySelector('.readings-table');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = [];
        cols.forEach(col => {
            csvRow.push(col.textContent.trim());
        });
        csv.push(csvRow.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bone-density-readings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Add smooth scrolling for any anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});