document.addEventListener('DOMContentLoaded', function() {
    // Set previous page sebagai user
    localStorage.setItem('previousPage', 'user');
    
    // Event listener untuk tombol logout
    const logoutButton = document.querySelector('.logout-btn');
    logoutButton.addEventListener('click', function() {
        window.location.href = 'Logout.html';
    });

    // Event listener untuk tombol back
    const backButton = document.querySelector('.back-btn');
    backButton.addEventListener('click', function() {
        window.location.href = 'UserDashboard.html';
    });

    // Event listener untuk tombol download
    const downloadButton = document.querySelector('.download-btn');
    downloadButton.addEventListener('click', function() {
        // Implementasi download CV
        alert('Download CV feature will be implemented soon!');
    });
}); 