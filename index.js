const qr = require("qrcode");
const fs = require("fs");

let data = {
  name: "Marco",
  surname: "Lasagna",
  age: "21",
};

let stringdata = JSON.stringify(data);

//Print QR code to terminal (only used for testing purposes)
qr.toString(stringdata, {type:'terminal'}, function (err, qrcode) {
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
