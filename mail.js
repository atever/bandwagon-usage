'use strict';
/**
 * <ateveryuan@gmail.com> created at 2017.02.09 19:33:30
 *
 * 邮件
 */

const nodemailer = require('nodemailer');
const config = require('./config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.sendMail,
        pass: config.mailPsw
    }
});



/**
 * 发送 text 邮件
 * @param users 收件人
 * @param subject 标题
 * @param html html 格式内容
 * @param callback 返回结果
 */
exports.sendTextMailToUsers = function(users, subject, html, callback) {
    if(!users || users.length === 0) {
        callback('用户为空');
        return;
    }

    let usersStr = users.join(',');
    let options = {
        from: '"流量日常"<justregisterid@gmail.com>', // sender address
        to: usersStr,
        subject: subject, // Subject line
        html: html,
        encoding: 'UTF-8'
    };

    transporter.sendMail(options, function(error, info) {
        callback(error, info);
    });
};



exports.mailInfo = function (data) {
    let content = `<table border="1">
                        <tr><td>ip</td><td>${data.ip}</td></tr>
                        <tr><td>崩掉</td><td>${data.suspended}</td></tr>
                        <tr><td>带宽</td><td>${data.monthlyData}</td></tr>
                        <tr><td>剩余带宽</td><td>${data.remain}</td></tr>
                        <tr><td>重置日期</td><td>${data.dataReset}</td></tr>
                    </table>`;

    return {
        title: 'SS用量通知',
        content: content
    };
};