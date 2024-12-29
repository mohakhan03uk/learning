const croData = [
    { name: "CRO1", person: "John Doe", email: "john@example.com", status: true },
    { name: "CRO2", person: "Jane Smith", email: "jane@example.com", status: false },
	{ name: "CRO3", person: "Smith", email: "jane@example.com", status: false },
	{ name: "CRO4", person: "xyz Jane Smith", email: "jane@example.com", status: false },
	{ name: "CRO5", person: "Jane fff Smith", email: "jane@example.com", status: false },
	{ name: "CRO1", person: "John Doe", email: "john@example.com", status: true },
    { name: "CRO2", person: "Jane Smith", email: "jane@example.com", status: false },
	{ name: "CRO3", person: "Smith", email: "jane@example.com", status: false },
	{ name: "CRO4", person: "xyz Jane Smith", email: "jane@example.com", status: false },
	{ name: "CRO5", person: "Jane fff Smith", email: "jane@example.com", status: false },
];

function loadTable() {
    const tableBody = document.getElementById('croTable');
    tableBody.innerHTML = ""; // Clear existing rows
    croData.forEach((cro, index) => {
        const row = `
            <tr>					
                <td data-label="CRO's Name:">${cro.name}</td>
                <td data-label="Name:">${cro.person}</td>
                <td data-label="Email:">${cro.email}</td>
                <td data-label="Status:">${cro.status ? "Active" : "Inactive"}</td>
                <td class="edit-col">
                    <button class="edit-btn" onclick="editCRO(${index})">Edit</button>
				</td>
				<td class="toggle-status-col">
                    <button class="toggle-btn" onclick="toggleStatus(${index})">
                        ${cro.status ? "Deactivate" : "Activate"}
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
        const cro = croData[index];
        document.getElementById('croName').value = cro.name;
        document.getElementById('personName').value = cro.person;
        document.getElementById('email').value = cro.email;
        formTitle.textContent = 'Edit CRO';
        saveButton.textContent = 'Update';
    } else {
        editingIndex = null;
        document.getElementById('croName').value = '';
        document.getElementById('personName').value = '';
        document.getElementById('email').value = '';
        formTitle.textContent = 'Add New CRO';
        saveButton.textContent = 'Save';
    }

    formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
}

function saveCRO() {
    const name = document.getElementById('croName').value;
    const person = document.getElementById('personName').value;
    const email = document.getElementById('email').value;

    if (name && person && email) {
        if (editingIndex !== null) {
            croData[editingIndex] = { name, person, email, status: croData[editingIndex].status };
            showToast(`CRO ${name} updated successfully.`);
        } else {
            croData.push({ name, person, email, status: true });
            showToast(`CRO ${name} added successfully.`);
        }
        loadTable();
        toggleForm();
    } else {
        showToast('Please fill in all fields before saving.');
    }
}

function editCRO(index) {
    toggleForm('edit', index);
}


function toggleStatus(index) {
    croData[index].status = !croData[index].status;
    loadTable();
    showToast(`CRO ${croData[index].name} is now ${croData[index].status ? 'Active' : 'Inactive'}`);
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
    const rows = document.querySelectorAll('#croTable tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        row.style.display = rowText.includes(query) ? '' : 'none';
    });
}

window.onload = loadTable;
