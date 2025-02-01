document.addEventListener('DOMContentLoaded', function() {
    // Mengambil referensi tombol-tombol
    const nopeButton = document.querySelector('.nope-btn');
    const sureButton = document.querySelector('.sure-btn');
    const logoutButton = document.querySelector('.logout-btn');

    // Dapatkan halaman sebelumnya dari localStorage
    const previousPage = localStorage.getItem('previousPage');

    // Fungsi untuk kembali ke halaman sebelumnya
    function backToPreviousPage() {
        if (previousPage === 'admin') {
            window.location.href = 'AdminPanel.html';
        } else {
            window.location.href = 'UserDashboard.html';
        }
    }

    // Fungsi untuk logout dan kembali ke halaman home
    function logout() {
        // Hapus data sesi
        localStorage.removeItem('user');
        localStorage.removeItem('previousPage');
        sessionStorage.clear();
        
        // Redirect ke halaman home
        window.location.href = 'Home.html';
    }

    // Event listener untuk tombol Nope
    nopeButton.addEventListener('click', backToPreviousPage);

    // Event listener untuk tombol Sure
    sureButton.addEventListener('click', logout);

    // Event listener untuk tombol Logout di header
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Karena sudah di halaman logout, tidak perlu melakukan apa-apa
    });
});
