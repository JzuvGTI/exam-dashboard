document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('#dataTable tbody');
    const searchInput = document.querySelector('#searchInput');
    const paginationSelect = document.querySelector('#pagination');
    const prevPageButton = document.querySelector('#prevPage');
    const nextPageButton = document.querySelector('#nextPage');
    const showEntries = document.querySelector('#showEntries');

    let currentPage = 1;
    let rowsPerPage = parseInt(paginationSelect.value, 10);

    // Function to filter rows based on search input
    function filterRows() {
        const query = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll('tr');
        const filteredRows = Array.from(rows).filter(row => {
            const cells = row.querySelectorAll('td');
            const text = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
            return text.includes(query);
        });

        return filteredRows;
    }

    // Function to update table pagination
    function updatePagination() {
        const filteredRows = filterRows();
        const totalRows = filteredRows.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        const start = (currentPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, totalRows);

        // Hide all rows first
        Array.from(table.querySelectorAll('tr')).forEach(row => row.style.display = 'none');
        
        // Show only rows for the current page
        filteredRows.forEach((row, index) => {
            if (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) {
                row.style.display = '';
            }
        });

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        // Update "Show entries" text
        showEntries.textContent = `Page ${start} to ${end} of ${totalRows}`;
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        currentPage = 1;
        updatePagination();
    });
    paginationSelect.addEventListener('change', function() {
        rowsPerPage = parseInt(this.value, 10);
        currentPage = 1;
        updatePagination();
    });
    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    nextPageButton.addEventListener('click', function() {
        const totalRows = filterRows().length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Initial setup
    updatePagination();
});
