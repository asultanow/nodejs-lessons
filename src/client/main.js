const baseURL = 'http://localhost:5000';
const usersDiv = document.getElementById('users');

fetch(`${baseURL}/users`)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(users => {
        console.log(users);
        usersDiv.innerText = users;
    });

const formForGettingById = document.getElementById('get-user-by-id');

formForGettingById.onsubmit = ev => {
    const userId = ev.target.elements.id.value;

    fetch(`${baseURL}/users/${userId}`)
        .then(response => response.json())
        .then(value => console.log(value));

    ev.preventDefault();
};

const formForCreating = document.getElementById('create-user');

formForCreating.onsubmit = ev => {

    fetch(`${baseURL}/users`, {
        method: 'POST',
        body: JSON.stringify({
            id: ev.target.elements.id.value,
            name: ev.target.elements.name.value,
            age: ev.target.elements.age.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(value => console.log(value));

    ev.preventDefault();
};

const formForUpdating = document.getElementById('update-user');

formForUpdating.onsubmit = ev => {
    const userId = ev.target.elements.id.value;

    fetch(`${baseURL}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: ev.target.elements.id.value,
            name: ev.target.elements.name.value,
            age: ev.target.elements.age.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(value => console.log(value));

    ev.preventDefault();
};

const formForDeleting = document.getElementById('delete-user');

formForDeleting.onsubmit = ev => {
    const userId = ev.target.elements.id.value;

    fetch(`${baseURL}/users/${userId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(value => console.log(value));

    ev.preventDefault();
};
