'use strict'

const fs = require('fs'),
    childProcess = require('child_process');
    var fileName = process.argv[2],
    func = process.argv[3];

function copyFile() {
    var now = new Date().toString(),
        newFileName = fileName.split('.')[0] + '_' + now.split(' ').join('_') + '.' + fileName.split('.')[1];

    console.log('File ' + fileName + ' will be copied to ' + newFileName);
    return childProcess.spawn('cp', [fileName, newFileName]);
}

function deleteFile() {
    console.log('File ' + fileName + ' will be deleted');
    return childProcess.spawn('rm', [fileName]);
}

fs.watch(fileName, function(){
    var action;

    console.log(fileName + ' changed!');

    switch(func) {
        case 'copy':
            action = copyFile();
            break;
        case 'del':
            action = deleteFile();
            break;
        default:
            console.log(func + ': command not found');
    }

    if (action) {
        action.stdout.pipe(process.stdout);
    }
});

console.log('Watching ' + fileName + ' changes');