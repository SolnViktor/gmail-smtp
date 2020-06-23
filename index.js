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

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    }, tls: {
        rejectUnauthorized: false
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {

const {name, contacts, message} = req.body
    let info = await transporter.sendMail({
        from: 'Portfolio', // sender address
        to: "solnseviktor@gmail.com", // list of receivers
        subject: "От работодателя", // Subject line
        // text: "Привет", // plain text body
        html: `<b>Сообщение из портфолио</b>
<div>Имя: ${name}</div>
<div>Контакты: ${contacts}</div>
        <div>Сообщение: ${message}</div>`, // html body
    });
    res.send("ok")
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('Example app listening on port 3010!');
});