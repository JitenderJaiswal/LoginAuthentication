const User=require('../models/user');
const passwordMailer=require('../mailers/forgot_password');
const updateMailer=require('../mailers/update_password');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const crypto = require('crypto');

//Users Profile
module.exports.profile = function(req, res){
    try{
        if(req.isAuthenticated()){
        return res.render('user_profile',{title:"User Profile",profile_user:req.user});
        }
        return res.render('user_sign_in',{title:"Codeial | Sign In"});  
    }catch(err){
        req.flash('error','ERROR IN View profile !!!');
        return res.redirect('back');
    }
}

//RENDER THE SIGNUP PAGE
module.exports.signUp=function(req,res){
    try{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{title:"Codeial | Sign Up"});  
   }catch(err){
    req.flash('error','ERROR in signUp!!!');
    return res.redirect('back');
}
}

//RENDER THE SIGNIN PAGE
module.exports.signIn=function(req,res){
    try{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{title:"Codeial | Sign In"});
   }catch(err){
    req.flash('error','ERROR in signIn!!!');
    return res.redirect('back');
}
}

//get the sign up data
module.exports.create=async function(req,res){
    try{
        const {name,email,password,confirm_password}=req.body;
        const letters = /^[A-Za-z]+$/;
        const emailformat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        //Fields Validation
        if(!name.match(letters)){
           req.flash('error','Username must have alphabet characters only');
           return res.redirect('back');
        }
        if(!email.match(emailformat)){
            req.flash('error','You have entered an invalid email address!');
           return res.redirect('back');
        }
        if(password.length < 8){
            req.flash('error','Password should be atleast of 8 characters');
           return res.redirect('back');
        }
        if(password!=confirm_password){
           req.flash('error','Password not match');
           return res.redirect('back');
        }

        let captcha=req.body['g-recaptcha-response'];

        if (!captcha){
        req.flash('error','Please select captcha');
        return res.redirect('back');
        }
       
        // Verify URL
        const query = stringify({ secret: 'secretkey', // Secret key
                                response:captcha,
                                remoteip: req.connection.remoteAddress
                               });

        // Make a request to verifyURL
        const captchaVerify = await fetch( `https://google.com/recaptcha/api/siteverify?${query}`);

       // If captcha not successful
       if (captchaVerify.success !== undefined && !captchaVerify.success){
          req.flash('error','Failed captcha verification');
          return res.redirect('back');
       }
       // If successful
       req.flash('success','Captcha passed');
       
       //Find User by email
       let user=await User.findOne({email:email});

       if(!user){
        //Hash Password
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password, salt);
        //User Create with Hash Password
        await User.create({name:name,email:email,password:hashPassword});
               
        req.flash('success','Sign Up successfully');
        return res.redirect('/users/sign-in');
      }
      else{
            req.flash('error','User already in database');
            return res.redirect('back');
          }
     }catch(err){
        req.flash('error','ERROR in creating User!!!');
        return res.redirect('back');
     }
}

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
    req.flash('success', 'Logged in Successfully!');
    return res.redirect('/');
    }catch(err){
        req.flash('error','ERROR in SignIn!!!');
        return res.redirect('back');
    }
}


//Signout
module.exports.destroySession = function(req, res){
    try{
    req.logout();
    req.flash('success', 'Logged Out Successfully!');
    return res.redirect('/');
    }catch(err){
        req.flash('error','ERROR in SignOut!!!');
        return res.redirect('back');
    }
}

//forgot password
module.exports.forgot_password=function(req, res){
    try{
    return res.render('forgot-password',{title:'Forgot Password'});
    }catch(err){
        req.flash('error','ERROR in fogot Password!!!');
        return res.redirect('back');
    }
}

//Send mail(forgot password)
module.exports.send_email= async function(req, res){
    try{
    //get token
    let buf=await crypto.randomBytes(20);
    let token = buf.toString('hex');

    //Find User by email
    let user=await User.findOne({ email: req.body.email });

    if (!user) {
        req.flash('error', 'No account with that email address exists.');
        return res.redirect('/users/forgot_password');
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 600000; // 10 min
    user.save();//Save to db with token
     
    //Send Mail 
    passwordMailer.newPassword(user,req,token);

    req.flash('success', 'E-mail sent to '+user.email);
    return res.redirect('/users/sign-in');
   }catch(err){
    req.flash('error','ERROR in Sending Email!!!');
    return res.redirect('back');
}
}

//find token
module.exports.find_token=async function(req, res){
   
    try{
    //find user with token
    let user=await User.findOne({ resetPasswordToken: req.params.token,
                                 resetPasswordExpires: { $gt: Date.now() } 
                               });                      
    if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        res.redirect('/users/forgot_password');
    }      

    return res.render('update_password',{title:'Update Password',token:req.params.token});
   }catch(err){
    req.flash('error','ERROR in finding Token!!!');
    return res.redirect('back');
}
}

//Update password
module.exports.update_password=async function(req, res){
    try{
     //find user with token
     let user=await User.findOne({ resetPasswordToken: req.params.token,
                                   resetPasswordExpires: { $gt: Date.now() } 
                                });
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }


        //Fields Validation
        if(req.body.new_password.length < 8){
            req.flash('error','Password should be atleast of 8 characters');
           return res.redirect('back');
        }
        if(req.body.new_password!=req.body.confirm_password){
           req.flash('error','Password not match');
           return res.redirect('back');
        }

        //hash password
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(req.body.new_password, salt);

        user.password = hashPassword; 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save();//save to db
      
        //Send mail Update Password
        updateMailer.updatePassword(user);

        req.flash('success', 'Password Update Successfully');
        return res.redirect('/users/sign-in');
    }catch(err){
        req.flash('error','ERROR in Update password!!!');
        return res.redirect('back');
    }
}
