import express from "express";
const app = express();
import { urlencoded, json } from "body-parser";
import { toString, toDataURL } from "qrcode";
import { writeFile } from 'fs';


app.set("view engine", "ejs");
app.use(urlencoded({ extended: false }));
app.use(json());

app.set("view engine", "ejs");
app.use(urlencoded({ extended: false }));
app.use(json());

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
toString(stringdata, opts, function (err, qrcode) {
  if(err) {
    return console.log("Error");
  }
  console.log(qrcode);
});

//Print QR code to file using base64 encoding
toDataURL(stringdata, function(err, qrcode) {
  if(err) {
    return console.log("An error occurred.");
  }
  writeFile("./qrcode.json", JSON.stringify(qrcode), err => {
    if(err) {
      console.log(err);
    }
  });
});
