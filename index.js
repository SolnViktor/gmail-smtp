const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";
/*
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    }, tls: {
        rejectUnauthorized: false
    }
});*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

/*app.post('/sendMessage', async function (req, res) {
    debugger

const {name, contacts, message} = req.body
    let info = await transporter.sendMail({
        from: 'Portfolio', // sender address
        to: "solnseviktor@gmail.com", // list of receivers
        subject: "От работодателя", // Subject line
        // text: "Привет", // plain text body
        html: `
       <b>Сообщение из портфолио</b>
       <div>Имя: ${name}</div>
       <div>Контакты: ${contacts}</div>
       <div>Сообщение: ${message}</div>`, // html body
    });
    res.send("ok")
});*/

app.post('/send-message', function (req, res) {
    debugger
/*    const email = req.body.email
    const name = req.body.name
    const message = req.body.message*/
    const {name, contacts, message} = req.body

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: smtp_login,
            pass: smtp_password
        }
    });

    let mailOptions = {
        from: 'email', // sender address
        to: '"solnseviktor@gmail.com',
        subject: 'Gmail Smtp NodeJs',
        html: `<div>
                    <h1>You have new message</h1>
                    <p>name: ${name}</p>
                    <p>email: ${contacts}</p>
                    <p>message: ${message}</p>
               </div> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error: ', error.message);
        }
        console.log('success');
    });
    res.send('email success')
});


const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log(`Example app listening on port: ${PORT}`);
});