# Login Authentication

##Run
localhost:8000

##Intro
Login Authentication website using ###Nodejs,###Ejs,###MongoDB and ###Javascript
Authentication system which can be used as a starter code for creating any new application

##1.SignUp with Captcha
User can create their Account by 
###a)By adding Name,EmailId,Password and Confirm password or
###b)By using Goggle O-Auth Authentication(Social authentication)
with secure functionality of captcha
CAPTCHA technology authenticates that a real person is accessing the web content to block spammers and 
bots that try to automatically harvest email addresses or try to automatically sign up for access to websites.

##2.SignIn
User can LogIn their Account by 
###a)By adding EmailId and Password or
###b)By using Goggle O-Auth Authentication(Social authentication).
After Sign-In User Can View their Profile

##3.SignOut
User can LogOut their Account.

##4.Forgot Password and Password Update
If User Forgot their Password then they can Update their Password by sending a Token link on their Email which expires after 10 min .
After click on the link user can update their password by adding new password and confirm password fields .
After this user will get a notifaction of Password Update .

For sending Email i use         ==>###NodeMailer
For Generating token i use      ==>###crypto
for Creating hashPassword i use ==>###bcrypt

