/*
Load users from localStorage when the page initializes.
localStorage can only store strings, so we JSON.parse the data.
If there is no data yet, we populate the array with some examples
and immediately save them back so the storage is not empty.
 */
function loadUsers() {
    var stored = localStorage.getItem('users');
    if (stored) {
        users = JSON.parse(stored);
    } else {
        users = [
            { id: 1, fullName: 'Ham Kaggawa', userName: 'Ham', email: 'kaggawaham@gmail.com', password: 'haam123', role: 'Admin', status: 'Active' },
            { id: 2, fullName: 'Ruth Tusiime', userName: 'Ruth', email: 'ruthtusiime@gmail.com', password: 'ruth256', role: 'Attendant', status: 'Active' },
            { id: 3, fullName: 'Bridget Ruth', userName: 'Bridget', email: 'bridgetruth@gmail.com', password: 'bridget42', role: 'Manager', status: 'Inactive' }
        ];
        saveUsers();
    }
}

/*
 Save the current users array back to localStorage.
 */
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// call loadUsers right away so we have some data to work with
loadUsers();

// ---------- validation helper functions ----------

function isUsernameTaken(username) {
    var i;
    for (i = 0; i < users.length; i++) {
        var u = users[i];
        if ((u.userName || u.username) === username) {
            return true;
        }
    }
    return false;
}

function isEmailTaken(email) {
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }
    return false;
}

function doPasswordsMatch(p1, p2) {
    return p1 === p2;
}

// ---------- DOM references ----------

var userListE1 = document.getElementById('userList');
var userCountE1 = document.getElementById('userCount');

/**
 * Render a list of users into the table. If no array is passed,
 * the global `users` array will be used.
 */
function renderUsers(usersToRender) {
    var i;
    if (!usersToRender) {
        usersToRender = users;
    }

    // clear the table body first
    userListE1.innerHTML = '';

    var html = '';
    for (i = 0; i < usersToRender.length; i++) {
        var user = usersToRender[i];
        var roleClass = 'role-' + user.role;
        var uname = user.userName || user.username;

        html += '<tr class="' + roleClass + '">';
        html += '<td>' + user.fullName + '</td>';
        html += '<td>' + uname + '</td>';
        html += '<td>' + user.email + '</td>';
        html += '<td>' + user.role + '</td>';
        html += '<td>' + user.status + '</td>';
        html += '<td>';
        html += '<button class="editBtn" data-id="' + user.id + '">Edit</button> ';
        html += '<button class="deleteBtn" data-id="' + user.id + '">Delete</button>';
        html += '</td></tr>';
    }

    userListE1.innerHTML = html;
    userCountE1.textContent = users.length;

    // after adding rows we need to wire up the buttons again
    attachButtonListeners();
}

// initial render
renderUsers();

/**
 * Attach click handlers to edit and delete buttons that were
 * just rendered into the table.
 */
function attachButtonListeners() {
    // delete buttons
    var deletes = document.querySelectorAll('.deleteBtn');
    var i;
    for (i = 0; i < deletes.length; i++) {
        deletes[i].addEventListener('click', function (e) {
            var userId = parseInt(e.target.getAttribute('data-id')); // gets user id from button
            deleteUser(userId);
        });
    }

    // edit buttons
    var edits = document.querySelectorAll('.editBtn');
    for (i = 0; i < edits.length; i++) {
        edits[i].addEventListener('click', function (e) {
            var userId = parseInt(e.target.getAttribute('data-id'));
            editUser(userId);
        });
    }
}

// ---------- form handling ----------

var userForm = document.getElementById('userForm');

userForm.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent page reload

    var fullName = document.getElementById('fullName').value.trim();
    var username = document.getElementById('userName').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confirm = document.getElementById('confirmPassword').value;
    var role = document.getElementById('role').value;
    var status = document.getElementById('status').value;

    // simple validation checks
    if (!fullName || !username || !email || !password || !confirm) {
        alert('Please fill all the fields');
        return;
    }

    if (!doPasswordsMatch(password, confirm)) {
        alert('Passwords do not match');
        return;
    }

    if (isUsernameTaken(username)) {
        alert('Username already taken');
        return;
    }

    if (isEmailTaken(email)) {
        alert('Email already taken');
        return;
    }

    // create and add the new user
    var newUser = {
        id: Date.now(),
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        role: role,
        status: status
    };

    users.push(newUser);
    saveUsers();
    renderUsers();
    userForm.reset();
});

/**
 * Delete a user by id after confirmation.
 */
function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        var newUsers = [];
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i].id !== id) {
                newUsers.push(users[i]);
            }
        }
        users = newUsers;
        saveUsers();
        renderUsers();
    }
}

/**
 * Edit a user by id using prompt dialogs for role/status.
 */
function editUser(id) {
    var user = null;
    var i;
    for (i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            user = users[i];
            break;
        }
    }
    if (!user) {
        return;
    }

    var newRole = prompt('Enter new role (Attendant, Manager, Admin):', user.role);
    if (newRole && (newRole === 'Attendant' || newRole === 'Manager' || newRole === 'Admin')) {
        user.role = newRole;
    }

    var newStatus = prompt('Enter new status (Active, Inactive):', user.status);
    if (newStatus && (newStatus === 'Active' || newStatus === 'Inactive')) {
        user.status = newStatus;
    }

    saveUsers();
    renderUsers();
}

// ---------- search ----------

var searchInput = document.getElementById('search');

searchInput.addEventListener('input', function () {
    var searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        renderUsers(users);
        return;
    }

    var filtered = [];
    var i;
    for (i = 0; i < users.length; i++) {
        var u = users[i];
        var uname = (u.userName || u.username).toLowerCase();
        if (u.fullName.toLowerCase().includes(searchTerm) ||
            uname.includes(searchTerm) ||
            u.email.toLowerCase().includes(searchTerm) ||
            u.role.toLowerCase().includes(searchTerm)) {
            filtered.push(u);
        }
    }

    renderUsers(filtered);
});
