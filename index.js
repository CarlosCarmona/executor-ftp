"use strict";

const fs = require("fs");
const Client = require("ssh2-sftp-client");
const sftp = new Client();

const Execution = global.ExecutionClass;

class ftpExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(res) {
    let _this = this;
    sftp
    .connect({
      host: res.host,
      port: res.port,
      username: res.username,
      privateKey: res.privateKey?fs.readFileSync(res.privateKey):undefined

    })
    .then(() => {
      // If connect - Catching errors:
      sftp.on("error", (err) => {
        let endOptions = {
          end: "error",
          messageLog: `Error ftp: ${err}`,
          err_output: `Error ftp: ${err}`
        };
        sftp.end();
        _this.end(endOptions);
      });

      sftp[res.command](res.sourcePath, res.destinationPath)
        .then((data) => {
          let endOptions = {
            end: "end",
            data_output: data
          };
          sftp.end();
          _this.end(endOptions);
        });

    // return sftp.list("/Users/carlos/Desktop/TEST_FTP/").then((data)=>{});
    // sftp.put("/Users/carlos/Desktop/TEST_FTP/abc.txt", "/Users/carlos/Desktop/TEST_FTP/1234.txt").then((data)=>{});
    //return sftp.list("/").then((data)=>{});
    // sftp.end();
    })
    .catch((err) => {
      let endOptions = {
        end: "error",
        messageLog: `Error ftp connection: ${err}`,
        err_output: `Error ftp connection: ${err}`
      };
      _this.end(endOptions);
    });

  }
}

module.exports = ftpExecutor;