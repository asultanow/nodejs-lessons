const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'dataBase', 'users.json');

exports.readUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
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
        fs.writeFile(filePath, JSON.stringify(users, null, 2), err => {
                if (err) {
                    reject(err);
                }

                resolve();
            }
        );
    });
};
