#!/usr/bin/env node

// Hack to dispose output from https://github.com/TooTallNate/node-lame/blob/master/deps/mpg123/src/libmpg123/parse.c#L578

var spawn = require('child_process').spawn;
var ps = spawn('node', [__dirname + '/../index.js']);
ps.stdout.pipe(process.stdout);
