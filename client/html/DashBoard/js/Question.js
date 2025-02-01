document.addEventListener('DOMContentLoaded', function() {
    // Mengambil pertanyaan yang tersimpan (jika ada)
    const pendingQuestion = localStorage.getItem('pendingQuestion');
    const textarea = document.querySelector('textarea');
    
    if (pendingQuestion) {
        textarea.value = pendingQuestion;
        localStorage.removeItem('pendingQuestion'); // Hapus setelah diambil
    }

    // Handle tombol back
    const backButton = document.querySelector('.back-btn');
    backButton.addEventListener('click', function() {
        window.location.href = 'UserDashboard.html';
    });

    // Handle tombol send
    const sendButton = document.querySelector('.send-btn');
    sendButton.addEventListener('click', function() {
        const question = textarea.value.trim();
        if (question) {
            // Di sini Anda bisa menambahkan logika untuk mengirim pertanyaan ke server
            alert('Pertanyaan Anda telah terkirim!');
            textarea.value = '';
        } else {
            alert('Silakan masukkan pertanyaan Anda terlebih dahulu.');
        }
    });

    // Handle tombol logout
    const logoutButton = document.querySelector('.logout-btn');
    logoutButton.addEventListener('click', function() {
        window.location.href = 'Logout.html';
    });
});
