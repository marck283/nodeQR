var express = require('express');
const app = express();
var qrcode = require('qrcode');
var fs = require('fs');
var https = require('https');


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

//Dati di esempio
let data = {
  name: "Marco",
  surname: "Lasagna",
  age: "21",
};

let stringdata = JSON.stringify(data);

const opts = {
  errorCorrectionLevel: 'H',
  type: 'terminal',
  quality: 0.95,
  margin: 1,
  color: {
    dark: '#208698',
    light: '#FFF',
  },
};

//Print QR code to terminal (only used for testing purposes)
qrcode.toString(stringdata, opts, function (err, qrcode) {
  if(err) {
    return console.log("Error");
  }
  console.log(qrcode);
});

//Print QR code to file using base64 encoding
qrcode.toDataURL(stringdata, function(err, qrcode) {
  if(err) {
    return console.log("An error occurred.");
  }
  fs.writeFile("./qrcode.json", JSON.stringify(qrcode), err => {
    if(err) {
      console.log(err);
    }
  });
});

https.createServer(options, app).listen(3000, (req, res) => {
  console.log("Server running on port 3000.");
});
