// Authentication Check
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

// Set Username
const username = localStorage.getItem('username') || 'User';
document.getElementById('headerUsername').textContent = username;
document.getElementById('dashboardUsername').textContent = username;

// Navigation Function
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(page + 'Page').classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }
}

// Track Order Form Handler
document.getElementById('trackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const orderNumber = document.getElementById('orderNumber').value.trim();
    
    if (orderNumber) {
        document.getElementById('resultOrderNumber').textContent = orderNumber;
        document.getElementById('trackingResult').classList.remove('hidden');
    }
});

// Account Form Handler
document.getElementById('accountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Account details updated successfully!');
});

// Initialize Charts
window.addEventListener('DOMContentLoaded', function() {
    // Pie Chart - Order Status Distribution
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Delivered', 'On the Way', 'Processing', 'Cancelled'],
            datasets: [{
                data: [12, 5, 3, 1],
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Bar Chart - Monthly Orders
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Orders',
                data: [4, 6, 8, 5, 3],
                backgroundColor: '#10b981',
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Orders: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 2
                    },
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});
