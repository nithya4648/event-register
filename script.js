// Event data
const events = [
    { id: 'coco', name: 'Coco', about: 'Fun cultural event.', participants: [] },
    { id: 'chess', name: 'Chess', about: 'Strategic chess competition.', participants: [] },
    { id: 'badminton', name: 'Badminton', about: 'Exciting badminton matches.', participants: [] }
];

// ROLE SELECTION
function goToParticipant() {
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('participant-dashboard').style.display = 'block';
    renderParticipantEvents();
}

function goToOrganizer() {
    document.getElementById('role-selection').style.display = 'none';
    document.getElementById('organizer-dashboard').style.display = 'block';
    renderOrganizerEvents();
}

// GO BACK TO ROLE SELECTION
function goBack() {
    document.getElementById('participant-dashboard').style.display = 'none';
    document.getElementById('organizer-dashboard').style.display = 'none';
    document.getElementById('role-selection').style.display = 'block';

    // Clear forms and participant tables
    events.forEach(e => {
        const formDiv = document.getElementById(`form-${e.id}`);
        if (formDiv) {
            formDiv.style.display = 'none';
            formDiv.querySelectorAll('input').forEach(input => input.value = '');
        }
        const participantDiv = document.getElementById(`participants-${e.id}`);
        if (participantDiv) participantDiv.style.display = 'none';
    });
}

// PARTICIPANT DASHBOARD
function renderParticipantEvents() {
    const container = document.getElementById('participant-events');
    container.innerHTML = '';

    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event';
        div.innerHTML = `
            <h3>${event.name} Event</h3>
            <p>${event.about}</p>
            <button onclick="showRegisterForm('${event.id}')">Register</button>
            <div id="form-${event.id}" style="display:none;">
                <input type="text" id="name-${event.id}" placeholder="Name" required>
                <input type="number" id="age-${event.id}" placeholder="Age" required>
                <input type="text" id="dept-${event.id}" placeholder="Department" required>
                <button onclick="registerParticipant('${event.id}')">Submit</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function showRegisterForm(eventId) {
    document.getElementById(`form-${eventId}`).style.display = 'block';
}

function registerParticipant(eventId) {
    const name = document.getElementById(`name-${eventId}`).value;
    const age = document.getElementById(`age-${eventId}`).value;
    const dept = document.getElementById(`dept-${eventId}`).value;

    if (!name || !age || !dept) {
        alert('Please fill all fields.');
        return;
    }

    const event = events.find(e => e.id === eventId);
    event.participants.push({ name, age, dept });
    alert(`${name} registered for ${event.name}`);
    document.getElementById(`form-${eventId}`).style.display = 'none';
}

// ORGANIZER DASHBOARD
function renderOrganizerEvents() {
    const container = document.getElementById('organizer-events');
    container.innerHTML = '';

    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event';
        div.innerHTML = `
            <h3>${event.name} Event</h3>
            <p>${event.about}</p>
            <p>Participants Count: <span id="count-${event.id}">${event.participants.length}</span></p>
            <button onclick="viewParticipants('${event.id}')">View Participants</button>
            <div id="participants-${event.id}" style="display:none;"></div>
            <button onclick="editEventAbout('${event.id}')">Edit About</button>
        `;
        container.appendChild(div);
    });
}

function viewParticipants(eventId) {
    const div = document.getElementById(`participants-${eventId}`);
    const event = events.find(e => e.id === eventId);

    if (div.style.display === 'block') {
        div.style.display = 'none';
        return;
    }

    if (event.participants.length === 0) {
        div.innerHTML = '<p>No participants yet.</p>';
    } else {
        let html = '<table><tr><th>Name</th><th>Age</th><th>Department</th></tr>';
        event.participants.forEach(p => {
            html += `<tr><td>${p.name}</td><td>${p.age}</td><td>${p.dept}</td></tr>`;
        });
        html += '</table>';
        div.innerHTML = html;
    }

    div.style.display = 'block';
}

function editEventAbout(eventId) {
    const newAbout = prompt('Enter new description:');
    if (newAbout) {
        const event = events.find(e => e.id === eventId);
        event.about = newAbout;
        renderOrganizerEvents();
    }
}
