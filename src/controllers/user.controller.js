const { readUsers, writeUsers } = require('../helpers/main');

exports.getUsers = (req, res) => {
    readUsers().then(users => {
        console.log(users);
        res.json(users);
    });
};

exports.getUserById = (req, res) => {
    readUsers().then(users => {
        console.log(users);

        res.json(users);
    });

    console.log(req.params);

    res.json(200);
};

exports.createUser = (req, res) => {
    console.log(req.params);
    console.log(req.body);

    readUsers()
        .then(users => {
            console.log(users);

            const id = users.length ? users.sort((a, b) => b.id - a.id)[0].id + 1 : 1;
            const user = {...req.body, id};

            console.log(user);
            users.push(user);
            users.sort((a, b) => a.id - b.id);

            return writeUsers(users);
        })
        .then(() => res.json('succeed'));
};

exports.updateUser = (req, res) => {
    console.log(req.params);
    console.log(req.body);

    readUsers()
        .then(users => {
            console.log(users);

            const updatedUsers = users.map(user => {
                // user.id === req.params.userId ? {...user, ...req.body} : user
                if (user.id === +req.params.userId) {
                    return {
                        id: user.id,
                        name: req.body.name || user.name,
                        age: req.body.age || user.age
                    }
                }

                return user;
            });

            console.log(updatedUsers);

            return writeUsers(updatedUsers);
        })
        .then(() => res.json('succeed'));
};

exports.deleteUser = (req, res) => {
    console.log(req.params);
    console.log(req.body);

    readUsers()
        .then(users => {
            console.log(users);

            const updatedUsers = users.filter(user => user.id !== +req.params.userId);

            console.log(updatedUsers);

            return writeUsers(updatedUsers);
        })
        .then(() => res.json('succeed'));
};
