'use strict';
/**
 * <ateveryuan@gmail.com> created at 2017.02.09 19:29:30
 *
 * 配置文件
 */

const config = {
    veId: '169',
    apiKey: 'private_VBcblOY0JTZZORaJQd',

    frequency: 1,  // 发送邮件的频率，单位 day

    senderMail: 'justrid@gmail.com', // gmail
    mailPsw: 'vtyuhoahbqgk',
    // 开启两部验证后需要使用应用专用密码 https://support.google.com/mail/?p=InvalidSecondFactor
    // https://nodemailer.com/usage/using-gmail/

    mailReceiver : ['atevan@gmail.com', '8178@qq.com'],
};

module.exports = config;
