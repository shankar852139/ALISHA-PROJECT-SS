const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const logger = require('./utils/log');
const chalkercli = require('chalkercli');
const CFonts = require('cfonts');

const app = express();
const port = process.env.PORT || 8000;

// Serve index.html at the root endpoint
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to fetch IP information using ipinfo.io
function getIpInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const rainbow = chalkercli.rainbow(`━━━━━━━━━━━━━━[ SERVER INFO ]━━━━━━━━━━━━━`);
            rainbow.render();
            logger(data.ip, '| IP Address |');
            logger(data.hostname, '| Hostname |')
            logger(data.country,'| Country |');
            logger(data.city, '| City |');
            logger(data.org, '| ISP |')
            logger('N/A (Node.js environment)', '| Browser |');
        })
        .catch(error => logger('Error:', error));
}

// Initial delay before fetching IP information
setTimeout(() => {
    logger("Server is loading system data...", "[ CHECK ]");
    getIpInfo();
}, 500);

// Function to start the bot
function startBot() {
    logger("Starting Mirai bot...", "[ MIRAI BOT ]");

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        if (codeExit === 1) {
            logger("Mirai bot exited with code 1. Restarting...", "[ RESTART ]");
            startBot(); // Restart on code 1
        } else if (codeExit === 2) {
            // Custom logic for code 2
            const delaySeconds = 10; // Example delay in seconds
            await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
            logger(`Mirai bot exited with code 2. Restarting after ${delaySeconds} seconds...`, "[ RESTART ]");
            startBot(); // Restart after delay for code 2
        }
    });

    child.on("error", function (error) {
        logger("Error occurred: " + JSON.stringify(error), "[ ERROR ]");
    });
}

// Delayed start of the bot after initial setup
setTimeout(() => {
    startBot();
}, 70);

// Info display using chalkercli and CFonts
const rainbow2 = chalkercli.rainbow('━━━━━━━━━━━━━━━━[ SHANKAR FILE ]━━━━━━━━━━━━━━━━━');
rainbow2.render();

CFonts.say('Nino', {
    font: 'block',
    align: 'center',
    gradient: ['red', 'magenta']
});
