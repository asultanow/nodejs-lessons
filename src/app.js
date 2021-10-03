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

Promise.all(promises).then(results => {
    results.forEach(result => console.log(result));

    users.forEach(user => {
        let dir;

        if (user.gender === 'male') {
            if (user.age < 20) {
                dir = mansYounger20;
            } else {
                dir = mans20AndOlder;
            }
        } else if (user.gender === 'female') {
            if (user.age < 20) {
                dir = womensYounger20;
            } else {
                dir = womens20AndOlder;
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
