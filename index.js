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
        user: smtp_login,
        pass: smtp_password,
    }, tls: {
        rejectUnauthorized: false
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    debugger

const {name, contacts, message} = req.body        //https://stackoverflow.com/questions/51980436/nodemailer-throws-error-invalid-login-534-5-7-14/51981381
    let info = await transporter.sendMail({  // разрешение от gmail по 2м ссылкам
        from: 'Portfolio',
        to: "solnseviktor@gmail.com",
        subject: "От работодателя",
        html: `
       <b>Сообщение из портфолио</b>
       <div>Имя: ${name}</div>
       <div>Контакты: ${contacts}</div>
       <div>Сообщение: ${message}</div>`,
    });
    res.send("ok")
});


const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log(`Example app listening on port: ${PORT}`);
});