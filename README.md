# Login Authentication

## Run
localhost:8000 .<br/>


## Intro
Login Authentication website using Nodejs,Ejs,MongoDB and Javascript .<br/>
Authentication system which can be used as a starter code for creating any new application .<br/>


## 1.SignUp with Captcha
User can create their Account by <br/>
### a)By adding Name,EmailId,Password and Confirm password or<br/>
### b)By using Goggle O-Auth Authentication(Social authentication) <br/>
with secure functionality of captcha<br/>
## CAPTCHA 
technology authenticates that a real person is accessing the web content to block spammers and <br/>
bots that try to automatically harvest email addresses or try to automatically sign up for access to websites.<br/>


## 2.SignIn
User can LogIn their Account by <br/>
### a)By adding EmailId and Password or <br/>
### b)By using Goggle O-Auth Authentication(Social authentication).<br/>
After Sign-In User Can View their Profile. <br/>
If user is logged in then they cannot redirect to Signin Page again for this i use Passport js<br/>
If user is logged in then they can view their profile otherwise not for this  i use Passport js<br/>


## 3.SignOut
User can LogOut their Account.<br/>


## 4.Forgot Password and Password Update
If User Forgot their Password then they can Update their Password by sending a Token link on their Email which expires after 10 min .<br/>
After click on the link user can update their password by adding new password and confirm password fields .<br/>
After this user will get a notification of Password Update .<br/>


#### For sending Email i use         ==>NodeMailer. <br/>
#### For Generating token i use      ==>crypto. <br/>
#### for Creating hashPassword i use ==>bcrypt. <br/>

