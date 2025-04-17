function getUsers() {
  fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('userTable');
      table.innerHTML = '';
      data.forEach(user => {
        table.innerHTML += `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
              <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editează</button>
              <button onclick="deleteUser(${user.id})">Șterge</button>
            </td>
          </tr>
        `;
      });
    });
}

function editUser(id, currentName, currentEmail) {
  const name = prompt('Nume nou:', currentName);
  const email = prompt('Email nou:', currentEmail);
  const password = prompt('Parolă nouă:');
  if (name && email && password) {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    }).then(() => getUsers());
  }
}

function deleteUser(id) {
  if (confirm('Ești sigur că vrei să ștergi acest utilizator?')) {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE'
    }).then(() => getUsers());
  }
}

getUsers();