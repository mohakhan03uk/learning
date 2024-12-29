const siteData = [
	{ siteCode: "site1", siteName: "Doe asd", 		email: "xyz@example.com", status: true },
        { siteCode: "site2", siteName: "Smiths sd", 		email: "xyz@example.com", status: false },
	{ siteCode: "site3", siteName: "sdssdsssd", 		email: "xyz@example.com", status: false },
	{ siteCode: "site4", siteName: "ane Smith", 		email: "xyz@example.com", status: false },
	{ siteCode: "site5", siteName: "fff Smith", 		email: "xyz@example.com", status: false },
];

function loadTable() {
    const tableBody = document.getElementById('siteTable');
    tableBody.innerHTML = ""; // Clear existing rows
    siteData.forEach((site, index) => {
        const row = `
            <tr>					
                <td data-label="Site Code:">${site.siteCode}</td>
                <td data-label="Site Name:">${site.siteName}</td>
                <td data-label="Email:">${site.email}</td>
                <td data-label="Status:">${site.status ? "Active" : "Inactive"}</td>
                <td class="edit-col">
                    <button class="edit-btn" onclick="editSITE(${index})">Edit</button>
				</td>
				<td class="toggle-status-col">
                    <button class="toggle-btn" onclick="toggleStatus(${index})">
                        ${site.status ? "Deactivate" : "Activate"}
                    </button>
                </td >
        <td class="show-col">
                    <button class="show-btn" onclick="toggleStatus(${index})">
                        Show
                    </button>
                </td >
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

let editingIndex = null;

function toggleForm(action = 'add', index = null) {
    const formContainer = document.getElementById('formContainer');
    const formTitle = document.getElementById('formTitle');
    const saveButton = document.querySelector('.save-btn');

    if (action === 'edit') {
        editingIndex = index;
        const site = siteData[index];
        document.getElementById('siteCode').value = site.siteCode;
        document.getElementById('siteName').value = site.siteName;
        document.getElementById('email').value = site.email;
        formTitle.textContent = 'Edit Site';
        saveButton.textContent = 'Update';
    } else {
        editingIndex = null;
        document.getElementById('siteCode').value = '';
        document.getElementById('siteName').value = '';
        document.getElementById('email').value = '';
        formTitle.textContent = 'Add New Site';
        saveButton.textContent = 'Save';
    }

    formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
}

function saveSITE() {
    const siteCode = document.getElementById('siteCode').value;
    const siteName = document.getElementById('siteName').value;
    const email = document.getElementById('email').value;

    if (code && name && email) {
        if (editingIndex !== null) {
            siteData[editingIndex] = { siteCode, siteName, email, status: siteData[editingIndex].status };
            showToast(`Site ${siteName} updated successfully.`);
        } else {
            siteData.push({ siteCode, siteName, email, status: true });
            showToast(`Site ${siteName} added successfully.`);
        }
        loadTable();
        toggleForm();
    } else {
        showToast('Please fill in all fields before saving.');
    }
}

function editSITE(index) {
    toggleForm('edit', index);
}


function toggleStatus(index) {
    siteData[index].status = !siteData[index].status;
    loadTable();
    showToast(`Site ${siteData[index].name} is now ${siteData[index].status ? 'Active' : 'Inactive'}`);
}


function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

function filterTable() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const rows = document.querySelectorAll('#siteTable tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(query) ? '' : 'none';
    });
}

window.onload = loadTable;
