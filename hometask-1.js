'use strict'

const fs = require('fs'),
    fileName = process.argv[2];

fs.watch(fileName, function () {
    console.log('file');
});