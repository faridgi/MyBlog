const nodemailer = require('nodemailer');


sendResetMail = (req, res, next)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'faridtah97@gmail.com',
            pass: 'l@gloiredef@rid2019'
        }
    });

    var message = "<br>Message: "+req.body.message;

    var mailOptions = {
        from: 'faridtah97@gmail.com' ,
        to: req.body.email,
        subject: "Reset your password",
        html: message // html body
    };
    transporter.sendMail(mailOptions, (err,infos)=>{
        if(err){
            console.log(err);
            req.flash('err', err.message);
            return res.redirect('/users/forgot-password');
        }else{
            console.log(infos);
            req.flash('success', 'Great, a reset email has been sent to the address :'+req.body.email
            +'.please check your mailbox and click on the reset link');
            return res.redirect('/users/forgot-password');
        }
    })
};

module.exports = sendResetMail;