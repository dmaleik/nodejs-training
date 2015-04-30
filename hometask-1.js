'use strict'

const fs = require('fs'),
    spawn = require('child_process').spawn;

var fileName = process.argv[2],
    func = process.argv[3];

if (!fileName || !func) {
    throw('fileName or func is empty');
}

fs.watch(fileName, function () {
    var action;

    console.log(fileName + ' changed!');

    if (func === 'copy') {
        action = copyFile();
    } else if (func === 'del') {
        action = deleteFile();
    } else {
        console.log(func + ': command not found');
    }

    if (action) {
        action.stdout.pipe(process.stdout);
    }
});

function copyFile() {
    var now = new Date().toString(),
        newFileName = fileName.split('.')[0]
            + '-'
            + now.split(' ').join('-')
            + '.' + fileName.split('.')[1];

    console.log('File will be copied to ' + newFileName);
    return spawn('cp', [fileName, newFileName]);
}

function deleteFile() {
    console.log('File will be deleted');
    return spawn('rm', [fileName]);
}

console.log('Watching ' + fileName + ' changes');