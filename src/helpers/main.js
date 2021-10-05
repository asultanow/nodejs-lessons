const fs = require('fs');
const path = require('path');

exports.readUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, '..', 'dataBase', 'users.json'),
            {encoding: 'utf8'},
            (err, data) => {
                if (err) {
                    reject(err);
                }

                const users = JSON.parse(data);
                resolve(users);
            }
        );
    });
};

exports.writeUsers = users => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'dataBase', 'users.json'),
            JSON.stringify(users, null, 2),
            err => {
                if (err) {
                    reject(err);
                }

                resolve();
            }
        );
    });
};
