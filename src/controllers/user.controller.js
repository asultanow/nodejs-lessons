const { readUsers, writeUsers } = require('../helpers/main.helper');

exports.getUsers = (req, res) => {
    readUsers()
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.json('failed');
        });
};

exports.getUserById = (req, res) => {
    readUsers()
        .then(users => {
            const user = users.find(user => user.id === +req.params.userId);

            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.json('failed');
        });
};

exports.createUser = (req, res) => {
    readUsers()
        .then(users => {
            const id = users.length ? users.sort((a, b) => a.id - b.id)[users.length - 1].id + 1 : 1;
            const user = { id, ...req.body };

            users.push(user);

            return writeUsers(users);
        })
        .then(() => res.json('succeeded'))
        .catch(err => {
            console.log(err);
            res.json('failed');
        });
};

exports.updateUser = (req, res) => {
    readUsers()
        .then(users => {
            const updatedUsers = users.map(user => {
                if (user.id === +req.params.userId) {
                    return {
                        id: user.id,
                        name: req.body.name || user.name,
                        age: req.body.age || user.age
                    }
                }

                return user;
            });

            return writeUsers(updatedUsers);
        })
        .then(() => res.json('succeeded'))
        .catch(err => {
            console.log(err);
            res.json('failed');
        });
};

exports.deleteUser = (req, res) => {
    readUsers()
        .then(users => {
            const updatedUsers = users.filter(user => user.id !== +req.params.userId);

            return writeUsers(updatedUsers);
        })
        .then(() => res.json('succeeded'))
        .catch(err => {
            console.log(err);
            res.json('failed');
        });
};
