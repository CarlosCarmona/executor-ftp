# FTP executor for [Runnerty]:

### Configuration sample:
```json
{
  "id": "ftp_default",
  "type": "@runnerty-executor-ftp",
  "host": "host.com",
  "port": "21",
  "user": "user",
  "password": "1234"
}
```

### Plan sample:
```json
{
  "id": "ftp_default",
  "command": "PUT",
  "sourcePath": "./sample.txt",
  "destinationPath": "/sample_file.txt"
}
```

[Runnerty]: http://www.runnerty.io
