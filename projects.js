const itemsPerPage = 3; // câte proiecte pe pagină rămâne la fel
const items = document.querySelectorAll('.project-card-wide');
const pagination = document.querySelector('.pagination');
let currentPage = 1;

function showPage(page) {
    currentPage = page;
    items.forEach((item, index) => {
        item.style.display =
            (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage)
                ? 'block'
                : 'none';
    });
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('a');
        btn.textContent = i;
        btn.href = "#";
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => showPage(i));
        pagination.appendChild(btn);
    }
}

showPage(1);
