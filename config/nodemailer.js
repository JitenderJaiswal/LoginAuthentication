//Goggle setting->allow less secure app

const nodemailer = require("nodemailer");              
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
                  service: 'gmail',
                     host: 'smtp.gmail.com',
                     port: 587,
                   secure: false,
                  auth: {user:'jitenderjaiswal686@gmail.com', 
                         pass:'Jeet1475@'
                        }
                  }); 
                  
let renderTemplate = (data, relativePath) => {
                      let mailHTML;
                      ejs.renderFile(path.join(__dirname, '../views/mailers', relativePath),
                      data,function(err, template){
                            if (err){console.log('error in rendering template'); return}
                              mailHTML = template;
                          })
                      return mailHTML;
                     }

module.exports = {transporter: transporter,
               renderTemplate: renderTemplate
                 }

 // Note:The Default port number for SMTP is-25 //SMTP over SSL/TLS works over port-587
// search->enable less secure app on gmail