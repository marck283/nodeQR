const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");
const fs = require('fs');


app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

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
qr.toString(stringdata, opts, function (err, qrcode) {
  if(err) {
    return console.log("Error");
  }
  console.log(qrcode);
});

//Print QR code to file using base64 encoding
qr.toDataURL(stringdata, function(err, qrcode) {
  if(err) {
    return console.log("An error occurred.");
  }
  fs.writeFile("./qrcode.json", JSON.stringify(qrcode), err => {
    if(err) {
      console.log(err);
    }
  });
});
