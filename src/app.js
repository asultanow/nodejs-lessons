const fs = require('fs');
const path = require('path');

const users = require('./users');

const mansYounger20 = path.join(__dirname, 'mansYounger20');
const mans20AndOlder = path.join(__dirname, 'mans20AndOlder');
const womensYounger20 = path.join(__dirname, 'womensYounger20');
const womens20AndOlder = path.join(__dirname, 'womens20AndOlder');

const dirs = [mansYounger20, mans20AndOlder, womensYounger20, womens20AndOlder];
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

Promise.allSettled(promises).then(results => {
    results.forEach(result => console.log(result.value));

    users.forEach(user => {
        if (user.gender === 'male') {
            if (user.age < 20) {
                createFile(mansYounger20, user);
                return;
            }

            createFile(mans20AndOlder, user);
            return;
        }

        if (user.gender === 'female') {
            if (user.age < 20) {
                createFile(womensYounger20, user);
                return;
            }

            createFile(womens20AndOlder, user);
        }
    });
}).catch(err => console.log(err));

function createFile(dir, user) {
    const file = `${user.name.toLowerCase()}.json`;

    fs.writeFile(path.join(dir, file), JSON.stringify(user, null, 2), err => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(`file "${file}" created in directory "${dir}"`);
    });
}
