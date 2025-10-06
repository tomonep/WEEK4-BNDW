// CAPTCHA Generation
function generateCaptcha() {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const captchaElement = document.getElementById('captcha');
    const colors = ['color: #ef4444', 'color: #10b981', 'color: #f59e0b', 'color: #059669'];
    
    captchaElement.innerHTML = code.split('').map((char, index) => 
        `<span style="${colors[index]}">${char}</span>`
    ).join('');
    
    return code;
}

// Initialize CAPTCHA
let currentCaptcha = generateCaptcha();

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const securityCode = document.getElementById('securityCode').value;
    
    // Validation
    if (!username || !password || !securityCode) {
        alert('Please fill in all fields');
        return;
    }
    
    if (securityCode !== currentCaptcha) {
        alert('Security code is incorrect');
        currentCaptcha = generateCaptcha();
        document.getElementById('securityCode').value = '';
        return;
    }
    
    // Store login info in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});
