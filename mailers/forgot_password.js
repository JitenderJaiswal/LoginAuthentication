const nodeMailer = require('../config/nodemailer');     //(Sending Our First Email via SMTP)

// this is another way of exporting a method
exports.newPassword = (user,req,token) => {
                       
    nodeMailer.transporter.sendMail({
               from: 'jitenderjaiswal686@gmail.com',
                 to: user.email,
            subject: "Reset password!",
               html: `<a href="http://${req.headers.host}/users/update/${token}">Reset Password Link</a>`   
                 }, (err, info) => {
                     if (err){console.log('Error in sending mail', err);
                              res.redirect('/users/forgot_password');
                          }
                      console.log(info);
                      return;
                 });
}