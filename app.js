'use strict';
/**
 * <ateveryuan@gmail.com> created at 2017.02.09 19:26:33
 *
 * 入口, 使用 node app.js 启动
 */

const request = require('request');
const mailService = require('./mail');
const config = require('./config');


setInterval(function() {
    request(`https://api.64clouds.com/v1/getServiceInfo?veid=${config.veId}&api_key=${config.apiKey}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            body = JSON.parse(body);


            if ((body.plan_monthly_data / 3) < body.data_counter) {
                // 剩余1/3 后开始发邮件

                let monthlyData = body.plan_monthly_data / Math.pow(1024, 3);
                let data = {
                    ip: body.ip_addresses,
                    suspended: body.suspended,
                    monthlyData: `${monthlyData}GB`,
                    remain: `${( monthlyData - (body.data_counter / Math.pow(1024, 3))).toFixed(2)}GB`,
                    dataReset: `${new Date(parseInt(body.data_next_reset * 1000))}`
                };
                console.log(data);

                let mail = mailService.mailInfo(data);
                mailService.sendTextMailToUsers(config.mailReceiver, mail.title, mail.content, function (err, data) {
                    if(err) {
                        return console.log(err);
                    }

                    if(data) console.log('mailSend');
                });
            }
        }
    });
}, 6400);
// },config.frequency/86400);
