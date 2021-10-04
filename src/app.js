const fs = require('fs');
const path = require('path');

const boys = path.join(__dirname, 'sortedData', 'boys');
const girls = path.join(__dirname, 'sortedData', 'girls');
const foldersForWriting = [boys, girls];
const foldersForReading = [
    path.join(__dirname, 'boys'),
    path.join(__dirname, 'girls')
];
const promises = [];

foldersForWriting.forEach(folder => {
    promises.push(new Promise((resolve, reject) => {
        fs.mkdir(folder, {recursive: true}, err => {
            if (err) {
                reject(err);
            }

            resolve(`created directory "${folder}"`);
        });
    }));
});

Promise.allSettled(promises).then(results => {
    results.forEach(result => console.log(result.value));

    foldersForReading.forEach(folder => {
        fs.readdir(folder, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(file => {
                fs.readFile(path.join(folder, file), {encoding: 'utf8'}, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    const person = JSON.parse(data);
                    let folderForWriting;

                    if (person.gender === 'male') {
                        folderForWriting = boys;
                    } else if (person.gender === 'female') {
                        folderForWriting = girls;
                    }

                    fs.writeFile(path.join(folderForWriting, file), JSON.stringify(person, null, 2), err => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        console.log(`file "${file}" created in directory "${folderForWriting}"`);
                    });
                });
            });
        });
    });

}).catch(err => console.log(err));
