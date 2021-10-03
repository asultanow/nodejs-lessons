const fs = require('fs');
const path = require('path');
const users = require('./users');

const dirs = [
    path.join(__dirname, 'mansYounger20'),
    path.join(__dirname, 'mans20AndOlder'),
    path.join(__dirname, 'womensYounger20'),
    path.join(__dirname, 'womens20AndOlder')
];
const promises = [];

dirs.forEach(dir => {
    promises.push(new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                reject(err);
            }

            resolve(`created directory "${dir}"`);
        });
    }));
});

Promise.all(promises).then(results => {
    results.forEach(result => console.log(result));

    users.forEach(user => {
        let dir;

        if (user.gender === 'male') {
            if (user.age < 20) {
                dir = dirs[0];
            } else {
                dir = dirs[1];
            }
        } else if (user.gender === 'female') {
            if (user.age < 20) {
                dir = dirs[2];
            } else {
                dir = dirs[3];
            }
        }

        const file = `${user.name.toLowerCase()}.json`;

        fs.writeFile(
            path.join(dir, file),
            JSON.stringify(user, null, 2),
            err => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(`file "${file}" created in directory "${dir}"`);
            }
        );
    });
}).catch(err => console.log(err));
