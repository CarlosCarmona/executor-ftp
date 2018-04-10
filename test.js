"use strict";

const Client = require("ssh2-sftp-client");
const sftp = new Client();
const fs = require("fs");

sftp.connect({
  /*
  host: "10.10.9.102",
  port: "22",
  username: "carlos",
  password: "14104235"
  */
  host: "procesos.kyeroo.com",
  port: "22",
  username: "root",
  privateKey: fs.readFileSync("/Users/carlos/.ssh/devkyeroo.pem")

}).then(() => {
  // return sftp.list("/Users/carlos/Desktop/TEST_FTP/");
  sftp.list("/")
    .then((data) => {
      console.log(data, "the data info");
      // sftp.put("/Users/carlos/Desktop/TEST_FTP/abc.txt", "/Users/carlos/Desktop/TEST_FTP/1234.txt");
      sftp.end();
    });

}).catch((err) => {
  console.log(err, "catch error");
});

sftp.on("error", (err) => {
  console.log(err);
});