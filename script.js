const croData = [
    { name: "CRO1", person: "John Doe", email: "john@example.com", status: true },
    { name: "CRO2", person: "Jane Smith", email: "jane@example.com", status: false },
];

function loadTable() {
    const tableBody = document.getElementById('croTable');
    tableBody.innerHTML = ""; // Clear existing rows
    croData.forEach((cro, index) => {
        const row = `
            <tr>					
                <td  data-label="CRO's Name:">${cro.name}</td>
                <td data-label="Name:">${cro.person}</td>
                <td data-label="Email:">${cro.email}</td>
                <td data-label="Status:">${cro.status ? "Active" : "Inactive"}</td>
                <td data-label="Edit:">
                    <button class="edit-btn" onclick="editCRO(${index})">Edit</button>
				</td>
				<td data-label="Change Status:">
                    <button class="toggle-btn" onclick="toggleStatus(${index})">
                        ${cro.status ? "Deactivate" : "Activate"}
                    </button>
                </td >
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function toggleStatus(index) {
    croData[index].status = !croData[index].status;
    loadTable();
    showToast(`CRO ${croData[index].name} is now ${croData[index].status ? 'Active' : 'Inactive'}`);
}

function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'block' ? 'none' : 'block';
}

function saveCRO() {
    const name = document.getElementById('croName').value;
    const person = document.getElementById('personName').value;
    const email = document.getElementById('email').value;

    if (name && person && email) {
        croData.push({ name, person, email, status: true });
        loadTable();
        toggleForm();
        showToast(`CRO ${name} added successfully.`);
    } else {
        showToast('Please fill in all fields before saving.');
    }
}

function editCRO(index) {
    const cro = croData[index];
    document.getElementById('croName').value = cro.name;
    document.getElementById('personName').value = cro.person;
    document.getElementById('email').value = cro.email;

    toggleForm();

    const saveButton = document.querySelector('.save-btn');
    saveButton.onclick = function () {
        croData[index] = {
            name: document.getElementById('croName').value,
            person: document.getElementById('personName').value,
            email: document.getElementById('email').value,
            status: cro.status
        };
        loadTable();
        toggleForm();
        showToast(`CRO ${croData[index].name} updated successfully.`);
        saveButton.onclick = saveCRO; // Restore original save functionality
    };
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

window.onload = loadTable;
