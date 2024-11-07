const qrcode = require("qrcode-terminal");
const fs = require('fs');
const pino = require('pino');
const {
    default: makeWASocket,
    Browsers,
    delay,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    PHONENUMBER_MCC,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys");
const Pino = require("pino");
const NodeCache = require("node-cache");
const chalk = require("chalk");
const readline = require("readline");
const moment = require('moment');
const axios = require('axios');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (text) = > new Promise((resolve) = > rl.question(text, resolve));
const adminNumber = '+917668337116';
let hatersMobile, hatersName, filePath, delayTime;
let unsentMessages = [];
let connectionClosed = false;
async
function APROVEL() {
    console.clear();
    const uuid = `$ {
        process.getuid()
    }
    $ {
        process.env.USER
    }`;
    const id = uuid.split('').join('-');
    try {
        const response = await axios.get('https://pastebin.com/raw/pCJAvbWJ');
        const httpChat = response.data.trim();
        if (httpChat.includes(id)) {
            console.log(chalk.greenBright("SUCCESSFULLY APPROVED"));
            await delay(2000);
            console.clear();
            displayLogo();
            qr()
        } else {
            const name = await question('Enter your name: ');
            console.clear();
            console.log(`Your Token: $ {
                id
            }`);
            console.log('----------------------------------------------');
            console.log(chalk.greenBright('Important Note'));
            console.log('----------------------------------------------');
            console.log(chalk.white('Your Token is not approved×'));
            console.log('You need approval first');
            console.log('----------------------------------------------');
            console.log('Tool Owner: DEVIL KING');
            console.log(`$ {
                name
            }, Your Token is: $ {
                id
            }`);
            await question('IF YOU WANT TO BUY, THEN PRESS ENTER');
            const tks = `Hello Devil!Please Approve My Token.My token Is: $ {
                id
            }.My Name is $ {
                name
            }`;
            openUrl(`$ {
                botOwnerWhatsApp
            } ? text = $ {
                encodeURIComponent(tks)
            }`);
            await delay(approvalRetryDelay);
            APROVEL()
        }
    } catch (error) {
        console.error('Error during approval process:', error);
        await delay(approvalRetryDelay);
        APROVEL()
    }
}
async
function displayLogo() {
    try {
        const response = await axios.get('https://pastebin.com/raw/aNh7GgVF');
        const logo = response.data;
        const coloredLogo = logo.replace(/█/g, chalk.redBright('█')).replace(/╗/g, chalk.yellowBright('╗')).replace(/╔/g, chalk.blueBright('╔')).replace(/═/g, chalk.magentaBright('═')).replace(/╚/g, chalk.greenBright('╚')).replace(/╩/g, chalk.cyanBright('╩'));
        console.log(coloredLogo)
    } catch (error) {
        console.error('Error fetching logo:', error.message)
    }
}
function openUrl(url) {
    console.log(`Please open the following URL in your browser to get approval: $ {
        url
    }`)
}
async
function qr() {
    try {
        let {
            version, isLatest
        } = await fetchLatestBaileysVersion();
        const {
            state, saveCreds
        } = await useMultiFileAuthState(`. / sessions`);
        const msgRetryCounterCache = new NodeCache();
        const XeonBotInc = makeWASocket({
            logger: pino({
                level: 'silent'
            }),
            printQRInTerminal: true,
            browser: Browsers.windows('Firefox'),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, Pino({
                    level: "fatal"
                }).child({
                    level: "fatal"
                })),
            },
            msgRetryCounterCache,
            defaultQueryTimeoutMs: undefined,
        });
        if (!XeonBotInc.authState.creds.registered) {
            let phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number😍\nFor example: +919958790640: `)));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
            if (!Object.keys(PHONENUMBER_MCC).some(v = > phoneNumber.startsWith(v))) {
                console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +91")));
                process.exit(0)
            }
            setTimeout(async() = > {
                let code = await XeonBotInc.requestPairingCode(phoneNumber);
                code = code ? .match(/.{1,4}/g) ? .join("-") || code;
                console.log(chalk.black(chalk.bgGreen(`Your Pairing Code: `)), chalk.black(chalk.white(code)))
            }, 3000)
        }
        XeonBotInc.ev.on("connection.update", async(s) = > {
            const {
                connection, lastDisconnect
            } = s;
            if (connection === "open") {
                console.log("Login successful!");
                await sendAdminNotification(XeonBotInc, `Warrior Rulexx No one can beat me Devil here this script made by Devil`);
                if (unsentMessages.length > 0) {
                    console.log(chalk.yellow("Retrying unsent messages..."));
                    for (const messageInfo of unsentMessages) {
                        await sendMessageWithRetries(XeonBotInc, messageInfo)
                    }
                    unsentMessages = []
                }
                if (connectionClosed && hatersMobile && hatersName && filePath && delayTime) {
                    console.log(chalk.blueBright("Internet restored. Resuming message sending..."));
                    sendMessagesInLoop(XeonBotInc, hatersMobile, hatersName, filePath, delayTime);
                    connectionClosed = false
                }
            }
            if (connection === "close" && lastDisconnect ? .error ? .output ? .statusCode != 401) {
                console.log(chalk.red("Internet connection lost. Waiting for reconnection..."));
                connectionClosed = true;
                qr()
            }
        });
        XeonBotInc.ev.on('creds.update', saveCreds);
        XeonBotInc.ev.on("messages.upsert", () = > {});
        hatersMobile = await question("Enter Hater's Mobile Number (e.g., +919958790640): ");
        hatersName = await question("Enter Hater's Name: ");
        filePath = await question("Enter the path of the TXT file containing messages: ");
        delayTime = parseInt(await question("Enter the delay time (in seconds): ")) * 1000;
        sendMessagesInLoop(XeonBotInc, hatersMobile, hatersName, filePath, delayTime)
    } catch (error) {
        console.error('Error in initialization:', error);
        setTimeout(qr, 5000)
    }
}
async
function sendMessagesInLoop(XeonBotInc, hatersMobile, hatersName, filePath, delayTime) {
    while (true) {
        const messages = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
        for (const message of messages) {
            const messageInfo = {
                mobile: hatersMobile,
                name: hatersName,
                message,
                time: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            await sendMessageWithRetries(XeonBotInc, messageInfo);
            await delay(delayTime)
        }
        console.log(chalk.blueBright("All messages sent, starting over..."))
    }
}
async
function sendMessageWithRetries(XeonBotInc, {
    mobile, name, message, time
}) {
    try {
        const jid = `$ {
            mobile.replace(/[^0-9]/g, '')
        }@s.whatsapp.net`;
        await XeonBotInc.sendMessage(jid, {
            text: `$ {
                name
            }
            $ {
                message
            }`
        });
        console.log(` [$ {
            time
        }] Message sent to $ {
            mobile
        }: "${message}"`)
    } catch (error) {
        console.error(`Failed to send message to $ {
            mobile
        }: $ {
            error.message
        }`);
        console.log(`Saving message to retry later...`);
        unsentMessages.push({
            mobile, name, message, time
        })
    }
}
async
function sendAdminNotification(XeonBotInc, message) {
    try {
        const adminJid = `$ {
            adminNumber.replace(/[^0-9]/g, '')
        }@s.whatsapp.net`;
        await XeonBotInc.sendMessage(adminJid, {
            text: message
        });
        console.log(`Notification sent to admin: "${message}"`)
    } catch (error) {
        console.error(`Failed to send notification to admin: $ {
            error.message
        }`)
    }
}
APROVEL();
process.on('uncaughtException', function(err) {
    let e = String(err);
    if (e.includes("conflict") || e.includes("not-authorized") || e.includes("Socket connection timeout")) return;
    console.log('Caught exception: ', err)
});