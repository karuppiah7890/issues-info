const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config('./.env');
const path = require('path');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


app.post('/contact', (req, res) => {
  nodemailer.createTestAccount((err, account) =>{
    const output = `
    <h3>Contact Detail</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // Step 1
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'xxx', // generated ethereal user
        pass: 'xxxx' // generated ethereal password
      },
      tls:{
        rejectUnauthorized: false
      }
    });

       //  Step 2
       let mailOptions = {
         from: "rogerw213@gmail.com", // sender address
         to: "bojurier@gmail.com", // list of receivers
         subject: "New Message", // Subject line
         text: req.body.message,
         html: output // html body
      };
      //  Step 3

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Email Sent!!!')
        }

        console.log('Message Sent: ' + info.message)
        console.log('Message URL:' + nodemailer.getTestMessageUrl(info))
      })
  })
})
// Serve staic assets if in production
if(process.env.NODE_ENV ==='production') {
  // set a static folder
  app.use(express.static('my-app/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'));
  })
}


app.listen(process.env.PORT || 5000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});