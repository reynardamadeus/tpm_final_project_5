// Pindahkan fungsi ke scope global
function toggleTeamInfo(teamId, event) {
    event.stopPropagation();
    const infoCard = document.getElementById(`teamInfo${teamId}`);
    const viewBtn = event.currentTarget;
    const icon = viewBtn.querySelector('i');
    
    // Tutup semua delete confirmations dan reset icon trash
    const allDeleteConfirmations = document.querySelectorAll('.delete-confirmation');
    const allDeleteBtns = document.querySelectorAll('.delete-btn');
    allDeleteConfirmations.forEach((card, index) => {
        card.classList.remove('show');
        const trashIcon = allDeleteBtns[index].querySelector('i');
        trashIcon.className = 'fa-regular fa-trash-can';
    });
    
    // Tutup info cards lainnya dan reset icon mata
    const allInfoCards = document.querySelectorAll('.team-info-card:not(.delete-confirmation)');
    const allViewBtns = document.querySelectorAll('.view-btn');
    
    allInfoCards.forEach((card, index) => {
        if (card.id !== `teamInfo${teamId}`) {
            card.classList.remove('show');
            const otherIcon = allViewBtns[index].querySelector('i');
            otherIcon.className = 'fa-regular fa-eye';
        }
    });
    
    // Toggle info card dan icon
    infoCard.classList.toggle('show');
    if (infoCard.classList.contains('show')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-regular fa-eye';
    }
}

function createDeleteConfirmation(teamId, teamName) {
    const confirmationCard = document.createElement('div');
    confirmationCard.className = 'team-info-card delete-confirmation';
    confirmationCard.id = `deleteConfirm${teamId}`;
    confirmationCard.innerHTML = `
        <div class="info-content">
            <h3 class="danger-text">Dangerous Action!</h3>
            <p class="warning-text">Deleting the team "${teamName}" will permanently remove all associated data and cannot be undone.</p>
            <p>Type "Confirm"</p>
            <input type="text" class="confirm-input" placeholder="Type here...">
            <div class="confirmation-buttons">
                <button class="back-btn" onclick="closeDeleteConfirmation(${teamId})">Back</button>
                <button class="next-btn" onclick="confirmDelete(${teamId})" disabled>Next</button>
            </div>
        </div>
    `;
    return confirmationCard;
}

function toggleDeleteConfirmation(teamId, event) {
    event.stopPropagation();
    const confirmationCard = document.getElementById(`deleteConfirm${teamId}`);
    const deleteBtn = event.currentTarget;
    const icon = deleteBtn.querySelector('i');
    
    // Tutup semua info cards dan reset icon mata
    const allInfoCards = document.querySelectorAll('.team-info-card:not(.delete-confirmation)');
    const allViewBtns = document.querySelectorAll('.view-btn');
    allInfoCards.forEach((card, index) => {
        card.classList.remove('show');
        const eyeIcon = allViewBtns[index].querySelector('i');
        eyeIcon.className = 'fa-regular fa-eye';
    });
    
    // Tutup delete confirmations lainnya dan reset icon trash
    const allDeleteConfirmations = document.querySelectorAll('.delete-confirmation');
    const allDeleteBtns = document.querySelectorAll('.delete-btn');
    
    allDeleteConfirmations.forEach((card, index) => {
        if (card.id !== `deleteConfirm${teamId}`) {
            card.classList.remove('show');
            const otherIcon = allDeleteBtns[index].querySelector('i');
            otherIcon.className = 'fa-regular fa-trash-can';
        }
    });
    
    // Toggle confirmation dan icon
    confirmationCard.classList.toggle('show');
    if (confirmationCard.classList.contains('show')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-regular fa-trash-can';
    }
    
    // Reset dan setup input validation
    const input = confirmationCard.querySelector('.confirm-input');
    const nextBtn = confirmationCard.querySelector('.next-btn');
    input.value = '';
    nextBtn.disabled = true;
    
    input.addEventListener('input', function() {
        nextBtn.disabled = this.value !== 'Confirm';
    });
}

function closeDeleteConfirmation(teamId) {
    const confirmationCard = document.getElementById(`deleteConfirm${teamId}`);
    const deleteBtn = document.querySelector(`.delete-btn[onclick*="${teamId}"]`);
    const icon = deleteBtn.querySelector('i');
    
    confirmationCard.classList.remove('show');
    icon.className = 'fa-regular fa-trash-can';
    confirmationCard.querySelector('.confirm-input').value = '';
    confirmationCard.querySelector('.next-btn').disabled = true;
}

function confirmDelete(teamId) {
    const teamName = document.querySelector(`#teamInfo${teamId}`).previousElementSibling.querySelector('.team-name').textContent;
    
    // Buat overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Buat popup
    const popup = document.createElement('div');
    popup.className = 'delete-success';
    popup.innerHTML = `
        <h2>Delete Team</h2>
        <div class="content">
            <div class="team-row">${teamName}</div>
            <p class="status-text">${teamName} has been deleted</p>
            <button class="next-btn" onclick="closeDeleteSuccess()">Next</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Trigger reflow untuk animasi
    void overlay.offsetWidth;
    void popup.offsetWidth;
    
    // Tambahkan class show untuk animasi
    overlay.classList.add('show');
    popup.classList.add('show');
    
    // Hapus team dari array
    teams = teams.filter(team => team.id !== teamId);
    
    // Tutup konfirmasi delete
    closeDeleteConfirmation(teamId);
}

function closeDeleteSuccess() {
    const popup = document.querySelector('.delete-success');
    const overlay = document.querySelector('.overlay');
    if (popup && overlay) {
        popup.classList.remove('show');
        overlay.classList.remove('show');
        
        // Tunggu animasi selesai sebelum menghapus elemen
        setTimeout(() => {
            popup.remove();
            overlay.remove();
            updateGrid();
        }, 300); // Sesuaikan dengan durasi transisi di CSS
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set previous page sebagai admin
    localStorage.setItem('previousPage', 'admin');
    
    // Event listener untuk tombol logout
    const logoutButton = document.querySelector('.logout-btn');
    logoutButton.addEventListener('click', function() {
        window.location.href = 'Logout.html';
    });

    const teamGrid = document.getElementById('teamGrid');
    const searchInput = document.getElementById('searchInput');
    let teams = []; // Array untuk menyimpan data tim

    // Fungsi untuk membuat kartu tim
    function createTeamCard(team, i) {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <span class="team-name">${team.name || `Team ${i + 1}`}</span>
            <div class="team-actions">
                <button class="view-btn" title="View" onclick="toggleTeamInfo(${team.id || i}, event)">
                    <i class="fa-regular fa-eye"></i>
                </button>
                <button class="edit-btn" title="Edit">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn" title="Delete" onclick="toggleDeleteConfirmation(${team.id || i}, event)">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;

        // Membuat elemen info team terpisah
        const infoCard = document.createElement('div');
        infoCard.className = 'team-info-card';
        infoCard.id = `teamInfo${team.id || i}`;
        infoCard.innerHTML = `
            <div class="info-content">
                <h3>Team Leader</h3>
                <p>Full Name: Petter Griffin</p>
                <p>Email: pettegril12@gmail.com</p>
                <p>WhatsApp Number: 08xx-xxx-xxxx</p>
                <p>Line ID: @PetteGrif</p>
                <p>GitLab: ID241293</p>
                <p>Birth Place: Texas</p>
                <p>Birth Date: 01/31/1999</p>
            </div>
        `;

        // Delete confirmation card
        const deleteConfirmation = createDeleteConfirmation(team.id || i, team.name || `Team ${i + 1}`);

        return [card, infoCard, deleteConfirmation];
    }

    // Fungsi untuk memperbarui grid
    function updateGrid() {
        teamGrid.innerHTML = '';
        
        for(let i = 0; i < 12; i++) {
            const team = teams[i] || { name: `Team ${i + 1}` };
            const [card, infoCard, deleteConfirmation] = createTeamCard(team, i);
            teamGrid.appendChild(card);
            teamGrid.appendChild(infoCard);
            teamGrid.appendChild(deleteConfirmation);
        }
    }

    // Event listener untuk pencarian
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTeams = teams.filter(team => 
            team.name.toLowerCase().includes(searchTerm)
        );
        updateGrid(filteredTeams);
    });

    // Sort functionality
    const sortBtn = document.getElementById('sortBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortOptions = document.querySelectorAll('.sort-option');

    // Toggle dropdown
    sortBtn.addEventListener('click', function(e) {
        sortDropdown.classList.toggle('show');
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sort-container')) {
            sortDropdown.classList.remove('show');
        }
    });

    // Handle sort options
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortType = this.dataset.sort;
            sortTeams(sortType);
            sortDropdown.classList.remove('show');
        });
    });

    function sortTeams(sortType) {
        switch(sortType) {
            case 'name-asc':
                teams.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                teams.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'date-asc':
                teams.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
                break;
            case 'date-desc':
                teams.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
                break;
        }
        updateGrid();
    }

    // Tambahkan event listener untuk reset icon saat scroll atau klik di luar
    document.addEventListener('scroll', resetAllIcons);
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.team-info-card') && 
            !e.target.closest('.view-btn') && 
            !e.target.closest('.delete-confirmation') && 
            !e.target.closest('.delete-btn')) {
            resetAllIcons();
        }
    });

    function resetAllIcons() {
        const allInfoCards = document.querySelectorAll('.team-info-card:not(.delete-confirmation)');
        const allDeleteConfirmations = document.querySelectorAll('.delete-confirmation');
        const allViewBtns = document.querySelectorAll('.view-btn');
        const allDeleteBtns = document.querySelectorAll('.delete-btn');
        
        allInfoCards.forEach(card => card.classList.remove('show'));
        allDeleteConfirmations.forEach(card => card.classList.remove('show'));
        
        allViewBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.className = 'fa-regular fa-eye';
        });
        
        allDeleteBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.className = 'fa-regular fa-trash-can';
        });
    }

    // Inisialisasi grid dengan slot kosong
    updateGrid();
});
