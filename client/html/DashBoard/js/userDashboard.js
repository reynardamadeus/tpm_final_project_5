document.addEventListener('DOMContentLoaded', function() {
    // Set previous page sebagai user
    localStorage.setItem('previousPage', 'user');
    
    // Event listener untuk tombol logout
    const logoutButton = document.querySelector('.logout-btn');
    logoutButton.addEventListener('click', function() {
        window.location.href = 'Logout.html';
    });

    // Menangani tombol Send pada bagian question
    const sendButton = document.querySelector('.send-btn');
    const questionInput = document.querySelector('.question input');

    sendButton.addEventListener('click', function() {
        // Simpan pertanyaan ke localStorage (opsional)
        const question = questionInput.value;
        if (question.trim()) {
            localStorage.setItem('pendingQuestion', question);
        }
        
        // Arahkan ke halaman Question.html
        window.location.href = 'Question.html';
    });

    // Tambahkan event listener untuk scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5; // Kecepatan scroll, bisa disesuaikan
        
        // Update posisi background
        document.documentElement.style.setProperty('--scroll-position', `${rate}px`);
    });
}); 