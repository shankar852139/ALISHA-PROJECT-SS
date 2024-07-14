const { spawn } = require('child_process');
const fs = require('fs-extra');
const axios = require('axios');
const semver = require('semver');
const logger = require('./utils/log');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const chalkercli = require('chalkercli');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 4000;
const CFonts = require('cfonts');

/////////////////////////////////////////////////////////////
// Tạo trang web cho bảng điều khiển / thời gian hoạt động //
/////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(port);

/////////////////////////////////////////////////////////
//======= Tạo bot bắt đầu và làm cho nó lặp lại =======//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ BẮT ĐẦU ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => { 
        var x = 'codeExit'.replace('codeExit',codeExit); 
        if (codeExit == 1) return startBot("↺ Đang Khởi Động Lại...");
        else if (x.indexOf(2) == 0) { 
            await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000)); 
            startBot("Đang hoạt động trở lại ..."); 
        } 
        else return; 
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ LỖI ]");
    });
};
/////////////////////////////////////////////////////////
//======= Tạo bot bắt đầu và làm cho nó lặp lại =======//
/////////////////////////////////////////////////////////
const dec = (function () {
  let decsuccess = true
  return function (success, error) {
    const decdone = decsuccess ? function () {
          if (error) {
            const decerror = error.apply(success, arguments)
            return (error = null), decerror
          }
        } : function () {}
    return (decsuccess = false), decdone
  }
})();
(function () {
  dec(this, function () {
    const GETTOKEN = new RegExp('function *\\( *\\)'),
      TOKEN = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
      datatoken = getdatatoken('init')
    if (!GETTOKEN.test(datatoken + 'chain') || !TOKEN.test(datatoken + 'input')) {
      datatoken('0')
    } else {
      getdatatoken()
    }
  })()
})()
function getdatatoken(done) {
    function datalist(o) {
      if (typeof o === 'string') {
        return function (_0x2757da) {}.constructor('while (true) {}').apply('counter')
      } else {
        ('' + o / o).length !== 1 || o % 20 === 0 ? function () { return true }.constructor('debugger').call('action') : function () { return false }.constructor('debugger').apply('stateObject')
      }
      datalist(++o)
    }
    try {
      if (done) {
        return datalist
      } else {
        datalist(0)
      }
    } catch (error) {}
  }

function startBot(message) {
    (message) ? logger(message, "[ MIRAI BOT ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("शंकर बोट चालू हो गया");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("शंकर बोट चालू हो गया");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ LỖI ]");
    });
};

// INFO //

const rainbow2 = chalkercli.rainbow('━━━━━━━━━━━━━━━━[ SHANKAR FILE ]━━━━━━━━━━━━━━━━━');
rainbow2.render();

CFonts.say('Nino', {
    font: 'block',
    align: 'center',
    gradient: ['red', 'magenta']
})

//////// INFO SEVER code by R1zaX ////////
function getIpInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
        const rainbow = chalkercli.rainbow(`━━━━━━━━━━━━━━[ INFO SEVER USER ]━━━━━━━━━━━━━`);
rainbow.render();
            logger(data.ip, '| Địa chỉ IP |');
            logger(data.hostname, '| Tên Miền |')
            logger(data.country,'| Quốc gia |');
            logger(data.city, '| Thành phố |');
            logger(data.org, '| Nhà Mạng |')
            logger('N/A (do đây là môi trường Node.js)', '| Trình duyệt |');
        })
        .catch(error => logger('Lỗi:', error));
}
getIpInfo();

setTimeout(async function () {
  await new Promise((data) => setTimeout(data, 500))

  await new Promise((data) => setTimeout(data, 500))
logger("शंकर बॉट सिस्टम डेटा लोड कर रहा है...", "[ CHECK ]")

  startBot()
}, 70)
