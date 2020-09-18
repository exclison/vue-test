const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')

ffmpeg.setFfmpegPath(ffmpegInstaller.path);


// const outStream = fs.createWriteStream('rtmp://localhost:1935/live/123');
setTimeout(() => {
    const command = new ffmpeg()
        .input('rtmp://58.200.131.2:1935/livetv/hunantv')
        // .inputOptions(['-i'])
        // .size('800x600')
        .on('start', function(commandLine) {
            console.log("start push......." + commandLine, '开始了');
            console.log("start command......." + command);
        })
        .on('end', function() {
            console.log("storp push........")
                // stopPush();
        })
        .on('error', function(err, stdout, stderr) {
            console.log('error:' + err.message);
            console.log('stdout:' + stdout);
            console.log('stderr:' + stderr);
            // stopPush();
        })
        .addOptions([
            '-c:v libx264',
            '-c:a copy',
            '-f flv',
        ])
        .output('rtmp://127.0.0.1/live/123')
        .run();
    console.log(4444444)
}, 1000)