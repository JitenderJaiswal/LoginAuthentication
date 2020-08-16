# Login Authentication

## Run
localhost:8000 .__

## Intro
Login Authentication website using Nodejs,Ejs,MongoDB and Javascript .__
Authentication system which can be used as a starter code for creating any new application .__

## 1.SignUp with Captcha
User can create their Account by __
### a)By adding Name,EmailId,Password and Confirm password or __
### b)By using Goggle O-Auth Authentication(Social authentication) __
with secure functionality of captcha __
## CAPTCHA 
technology authenticates that a real person is accessing the web content to block spammers and __
bots that try to automatically harvest email addresses or try to automatically sign up for access to websites.__

## 2.SignIn
User can LogIn their Account by __
### a)By adding EmailId and Password or __
### b)By using Goggle O-Auth Authentication(Social authentication). __
After Sign-In User Can View their Profile __

## 3.SignOut
User can LogOut their Account.__

## 4.Forgot Password and Password Update
If User Forgot their Password then they can Update their Password by sending a Token link on their Email which expires after 10 min .__
After click on the link user can update their password by adding new password and confirm password fields .__
After this user will get a notifaction of Password Update .__

#### For sending Email i use         ==>NodeMailer. __
#### For Generating token i use      ==>crypto. __
#### for Creating hashPassword i use ==>bcrypt. __

