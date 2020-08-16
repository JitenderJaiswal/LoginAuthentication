const nodeMailer = require('../config/nodemailer');     //(Sending Our First Email via SMTP)

// this is another way of exporting a method
exports.updatePassword = (user) => {
    nodeMailer.transporter.sendMail({
               from: 'your email',
                 to: user.email,
            subject: "Reset password!",
               html: `<h1>Password Update Successfully</h1>`   
                  }, (err, info) => {
                      if (err){console.log('Error in sending mail', err);
                               res.redirect('/users/forgot_password');
                              }
                     console.log('Message sent', info);
                      return;
                   });
}
