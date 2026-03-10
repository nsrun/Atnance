// DOM Elements
const clockElement = document.getElementById('clock');
const btnCheckIn = document.getElementById('btn-check-in');
const btnCheckOut = document.getElementById('btn-check-out');
const employeeIdInput = document.getElementById('employee-id');
const employeeNameInput = document.getElementById('employee-name');
const statusMessage = document.getElementById('status-message');
const historyBody = document.getElementById('history-body');
const presentCount = document.getElementById('present-count');
const activeCount = document.getElementById('active-count');
const refreshBtn = document.getElementById('refresh-btn');

// Live Clock
function updateClock() {
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Fetch and Render History
async function fetchAttendance() {
    try {
        const response = await fetch('/api/attendance');
        const data = await response.json();
        renderHistory(data);
    } catch (error) {
        console.error('Error fetching attendance:', error);
    }
}

function renderHistory(records) {
    historyBody.innerHTML = '';
    
    let dailyActive = 0;
    const uniqueIds = new Set();

    records.forEach(record => {
        const row = document.createElement('tr');
        
        const isCurrentlyIn = !record.check_out;
        if (isCurrentlyIn) dailyActive++;
        uniqueIds.add(record.employee_id);

        row.innerHTML = `
            <td>${record.name}</td>
            <td><code>${record.employee_id}</code></td>
            <td>${record.check_in.split(' ')[1]}</td>
            <td>${record.check_out ? record.check_out.split(' ')[1] : '--:--:--'}</td>
            <td>
                <span class="status-badge ${isCurrentlyIn ? 'status-online' : 'status-offline'}">
                    ${isCurrentlyIn ? 'IN' : 'OUT'}
                </span>
            </td>
        `;
        historyBody.appendChild(row);
    });

    activeCount.innerText = dailyActive;
    presentCount.innerText = uniqueIds.size;
}

// Show Status Message
function showMessage(text, type) {
    statusMessage.innerText = text;
    statusMessage.className = `status-message msg-${type}`;
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000);
}

// Check In Action
btnCheckIn.addEventListener('click', async () => {
    const employee_id = employeeIdInput.value.trim();
    const name = employeeNameInput.value.trim();

    if (!employee_id || !name) {
        showMessage('Please enter both ID and Name to check in.', 'error');
        return;
    }

    try {
        const response = await fetch('/api/check-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employee_id, name })
        });
        const result = await response.json();

        if (result.status === 'success') {
            showMessage(result.message, 'success');
            employeeIdInput.value = '';
            employeeNameInput.value = '';
            fetchAttendance();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Connection error. Please try again.', 'error');
    }
});

// Check Out Action
btnCheckOut.addEventListener('click', async () => {
    const employee_id = employeeIdInput.value.trim();

    if (!employee_id) {
        showMessage('Please enter your Employee ID to check out.', 'error');
        return;
    }

    try {
        const response = await fetch('/api/check-out', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employee_id })
        });
        const result = await response.json();

        if (result.status === 'success') {
            showMessage(result.message, 'success');
            employeeIdInput.value = '';
            employeeNameInput.value = '';
            fetchAttendance();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        showMessage('Connection error. Please try again.', 'error');
    }
});

refreshBtn.addEventListener('click', fetchAttendance);

// Initial Load
fetchAttendance();
setInterval(fetchAttendance, 30000); // Auto refresh every 30s
